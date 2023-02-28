import { HotelEntity } from '@akkor-hotel/backend/feature-hotel/data-access';
import { UserEntity } from '@akkor-hotel/backend/feature-user/data-access';
import { CreatedHotelResponse, CreateHotelDto } from '@akkor-hotel/shared/api-interfaces';
import {
  clearTables,
  createAdminUser,
  createDummyUser,
  FakeUser,
  generateRandomString,
  TypeORMMySqlTestingModule,
} from '@akkor-hotel/shared/test';
import { HttpMethod } from '@akkor-hotel/shared/utils';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

let adminUser: FakeUser;
let dummyUser: FakeUser;

let dataSource: DataSource;
beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      TypeORMMySqlTestingModule([UserEntity, HotelEntity]),
      TypeOrmModule.forFeature([UserEntity, HotelEntity]),
    ],
  }).compile();

  dataSource = module.get<DataSource>(DataSource);

  adminUser = await createAdminUser(dataSource, 'hotel');
  dummyUser = await createDummyUser(dataSource, 'hotel');

  generatedHotels = await generateRandomHotels();
});

const hotelDto: CreateHotelDto = {
  name: 'test',
  address: 'test',
  city: 'test',
  country: 'test',
  description: 'test',
  picture: 'test',
};

let generatedHotels: CreatedHotelResponse[];

describe('/hotel (GET)', () => {
  it('user should get all hotels with default limit of 10', async () => {
    const response = await dummyUser.client.sendRequest(
      HttpMethod.GET,
      `/hotel`
    );
    expect(response.status).toBe(200);
    expect((response.data as []).length).toBe(10);
  });

  it('user should get all hotels with limit of 5 ordered by id', async () => {
    const response = await dummyUser.client.sendRequest(
      HttpMethod.GET,
      `/hotel?limit=5`
    );
    expect(response.status).toBe(200);
    expect((response.data as []).length).toBe(5);

    //check sort order asc
    const hotels = response.data as CreatedHotelResponse[];
    for (let i = 0; i < hotels.length - 1; i++) {
      expect(hotels[i].id).toBeLessThanOrEqual(hotels[i + 1].id);
    }
  });

  it('user should get all hotels sorted by city', async () => {
    const response = await dummyUser.client.sendRequest(
      HttpMethod.GET,
      `/hotel?sort=city&limit=5`
    );
    expect(response.status).toBe(200);
    expect((response.data as []).length).toBe(5);

    const hotelsReceived = response.data as CreatedHotelResponse[];
    const hotels = response.data as CreatedHotelResponse[];
    //shuffling hotels
    for (let i = hotels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [hotels[i], hotels[j]] = [hotels[j], hotels[i]];
    }
    //sort hotels by city
    hotels.sort((a, b) => {
      return a.city.localeCompare(b.city);
    });

    //check if hotelsReceived is same as hotels
    expect(hotels).toEqual(hotelsReceived);
  });

  it('user should get all hotels sorted by date', async () => {
    const response = await dummyUser.client.sendRequest(
      HttpMethod.GET,
      `/hotel?sort=date&limit=5`
    );
    expect(response.status).toBe(200);
    expect((response.data as []).length).toBe(5);
    const hotelsReceived = response.data as CreatedHotelResponse[];

    //check sort order asc by createdAt here
    const hotels = response.data as CreatedHotelResponse[];
    //shuffling hotels
    for (let i = hotels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [hotels[i], hotels[j]] = [hotels[j], hotels[i]];
    }
    //sort hotels by createdAt
    hotels.sort((a, b) => {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });
    expect(hotels).toEqual(hotelsReceived);
  });
});

describe('/hotel (POST)', () => {
  it('admin should be able to create hotel', async () => {
    const response = await adminUser.client.sendRequest(
      HttpMethod.POST,
      `/hotel`,
      hotelDto
    );
    expect(response.status).toBe(201);
    const hotel = response.data;
    expect(hotel.name).toBe(hotelDto.name);
    expect(hotel.address).toBe(hotelDto.address);
    expect(hotel.city).toBe(hotelDto.city);
    expect(hotel.country).toBe(hotelDto.country);
    expect(hotel.description).toBe(hotelDto.description);
    expect(hotel.picture).toBe(hotelDto.picture);
  });
});

afterAll(async () => {
  await clearTables(dataSource);
});

async function generateRandomHotels() : Promise<CreatedHotelResponse[]> {
  const hotels = [];
  for (let i = 0; i < 20; i++) {
    const createHotelDto = {
      name: generateRandomString(10),
      address: `test${i}`,
      city: generateRandomString(10),
      country: `test${i}`,
      description: `test${i}`,
      picture: `test${i}`,
    } as CreateHotelDto;
    const response = await adminUser.client.sendRequest(
      HttpMethod.POST,
      `/hotel`,
      createHotelDto
    );
    hotels.push(response.data);
  }
  return new Promise( (resolve) => {
    resolve(hotels);
  });
}
