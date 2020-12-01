import { CarRepository } from "../repository/CarRepository";
import { Response, Request, NextFunction } from 'express';
import HttpException from "../error/HttpException";

export class CarController {

    carRepository: CarRepository;
    
    constructor(carRepository: CarRepository) {
        this.carRepository = carRepository;
    }

    public getAll = async(request: Request, response: Response, next: NextFunction) => {

        const { idUser } = request.params;

        if (idUser) {
            try {
                await this.carRepository.findAllCars(idUser).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error getting cars', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    public create = async(request: Request, response: Response, next: NextFunction) => {

        const body = request.body;
        const { idUser } = request.params;

        if (body && idUser) {

            try {
                const car = await this.carRepository.save(body, idUser).then((err) => {});
                return response.status(201).json(car).send(); 
            }catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error creating car', ''));
            }
        }
    }

    public update = async(request: Request, response: Response, next: NextFunction) => {

        const { idCar } = request.params;
        const body = request.body;

        if (body && idCar) {
            try {
                const car:any = await this.carRepository.update(body, idCar);
                return response.status(200).json(car);
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error updating car', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    public delete = async(request: Request, response: Response, next: NextFunction) => {

        const { idCar } = request.params;

        if (idCar) {
            try {
                const car = await this.carRepository.delete(idCar);
                return response.status(204).send(); 
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error deleting car', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }
}