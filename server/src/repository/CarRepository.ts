import { Car } from './../model/Car';
import db from "./../database/connection";

export class CarRepository {

    public async findAllCars(idUser: string): Promise<Car[]> {
        const cars = await db('car').select('*').where({user_id: idUser}).catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return cars;
    }

    async save(car: Car, idUser: string): Promise<any> {

        const carSaved = await db('car').insert({
            license_plate: car.license_plate,
            category: car.category,
            renavan: car.renavan,
            proprietary_name: car.proprietary_name,
            proprietary_document: car.proprietary_document,
            note: car.note,
            model_id: car.model_id,
            user_id: idUser
        }).then((resp) => {
            return resp;
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });

        return carSaved;
    }

    async update(car: Car, idCar: string): Promise<any> {

        const carUpdated = await db('car').where({id_car: idCar}).update({
            license_plate: car.license_plate,
            category: car.category,
            renavan: car.renavan,
            proprietary_name: car.proprietary_name,
            proprietary_document: car.proprietary_document,
            note: car.note,
            model_id: car.model_id,
        }).then((resp) => {
            return resp;
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });

        return carUpdated;
    }

    async delete(idCar: any): Promise<any> {
        const car = await db('car').select('*').where({id_car: idCar}).del().catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return car;
    }

}