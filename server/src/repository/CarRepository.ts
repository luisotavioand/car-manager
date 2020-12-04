import { Car } from './../model/Car';
import db from "./../database/connection";
import HttpException from '../error/HttpException';

export class CarRepository {

    public async findAllCars(): Promise<Car[]> {
        const cars = await db('car').select('*').catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return cars;
    }

    public async findCarById(idCar: string): Promise<Car> {

        const cars = await db('car').select('*').where({ id_car: idCar }).catch((err) => {
            throw new Error(err.sqlMessage);
        });
        
        if (cars.length > 0) {
            return cars[0];
        } else {
            throw new HttpException(404,'Car not found',`Cannot find card with id_car:${idCar}`);
        }
    }

    async save(car: Car): Promise<any> {

        const carSaved = await db('car').insert({
            license_plate: car.license_plate,
            category: car.category,
            renavan: car.renavan,
            proprietary_name: car.proprietary_name,
            proprietary_document: car.proprietary_document,
            note: car.note,
            model_id: car.model_id
        }).then(async (resp) => {
            const data = await this.findCarById(resp.toString());
            return data;
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return carSaved;
    }

    async update(car: Car, idCar: string): Promise<any> {
        await this.findCarById(idCar);
        const carUpdated = await db('car').where({id_car: idCar}).update({
            license_plate: car.license_plate,
            category: car.category,
            renavan: car.renavan,
            proprietary_name: car.proprietary_name,
            proprietary_document: car.proprietary_document,
            note: car.note,
            model_id: car.model_id,
        }).then(async(resp) => {
            const data = await this.findCarById(idCar);
            return data;
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });

        return carUpdated;
    }

    async delete(idCar: any): Promise<any> {
        await this.findCarById(idCar);
        const car = await db('car').select('*').where({id_car: idCar}).del().catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return car;
    }

}