import { BookingEntity } from '@akkor-hotel/backend/feature-booking/data-access';
import { HotelEntity } from '@akkor-hotel/backend/feature-hotel/data-access';
import { UserEntity } from '@akkor-hotel/backend/feature-user/data-access';
import {
  CreateBookingDto,
} from '@akkor-hotel/shared/api-interfaces';
import {
  clearTables,
  createAdminUser,
  createDummyUser,
  FakeUser,
  TypeORMMySqlTestingModule,
} from '@akkor-hotel/shared/test';
import { HttpMethod } from '@akkor-hotel/shared/utils';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

let dataSource: DataSource;
let adminUser: FakeUser;
let dummyUser: FakeUser;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    providers: [JwtService],
    imports: [
      TypeORMMySqlTestingModule([UserEntity, BookingEntity, HotelEntity]),
      TypeOrmModule.forFeature([UserEntity, BookingEntity, HotelEntity]),
    ],
  }).compile();

  dataSource = module.get<DataSource>(DataSource);

  dummyUser = await createDummyUser(dataSource, 'booking');
  adminUser = await createAdminUser(dataSource, 'booking');

  //hotel = await generateHotel(adminUser);
});

describe('/booking (POST)', () => {



  it('user should create a new booking', async () => {
    expect(dummyUser.user.id).toBeDefined();
    expect(adminUser.user.id).toBeDefined();
    expect(dummyUser.client.getConfiguration()).toBeDefined();
    expect(dummyUser.client).toBeDefined();

    const resp = await adminUser.client.sendRequest(HttpMethod.POST, `/hotel`, {
      name: 'test',
      address: 'test',
      city: 'test',
      country: 'test',
      description: 'test',
      picture: 'test',
    });


    const response = await dummyUser.client.sendRequest(
      HttpMethod.POST,
      `/booking`,
      {
        hotelId: resp.data.id,
        startDate: new Date(),
        endDate: new Date(),
        userId: dummyUser.user.id,
      } as CreateBookingDto
    );
    expect(response.status).toBe(201);
    const data = response.data;

    expect(data.id).toBeDefined();
    expect(data.created_at).toBeDefined();
    expect(data.updated_at).toBeDefined();

    expect(data.hotel.id).toBe(resp.data.id);
    expect(data.startDate).toBe(data.startDate);
    expect(data.endDate).toBe(data.endDate);
    expect(data.hotel).toEqual(resp.data);
  });
});


afterAll(async () => {
  await clearTables(dataSource);
});
