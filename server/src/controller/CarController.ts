import { CarRepository } from "../repository/CarRepository";
import { Response, Request, NextFunction } from 'express';
import HttpException from "../error/HttpException";

export class CarController {

    carRepository: CarRepository;
    
    constructor(carRepository: CarRepository) {
        this.carRepository = carRepository;
    }

    public get = async(request: Request, response: Response, next: NextFunction) => {

        const { idCar } = request.params;

        if (idCar) {
            try {
                await this.carRepository.findCarById(idCar).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(err.status || 500, err.message || 'Unexpected error getting car', ''));
            }
        } else {
            try {
                await this.carRepository.findAllCars().then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error getting cars', ''));
            }
        }
    }

    public create = async(request: Request, response: Response, next: NextFunction) => {

        const body = request.body;

        if (body) {
            try {
                const car = await this.carRepository.save(body);
                return response.status(201).json(car).send(); 
            }catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error creating car', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    public update = async(request: Request, response: Response, next: NextFunction) => {

        const { idCar } = request.params;
        const body = request.body;

        if (body && idCar) {
            try {
                const car: any = await this.carRepository.update(body, idCar);
                return response.status(200).json(car);
            }catch(err) {
                next(new HttpException(err.status || 500, err.message || 'Unexpected error updating car', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    public delete = async(request: Request, response: Response, next: NextFunction) => {

        const { idCar } = request.params;

        if (idCar) {
            try {
                await this.carRepository.delete(idCar);
                return response.status(204).send(); 
            }catch(err) {
                next(new HttpException(err.status || 500, err.message || 'Unexpected error deleting car', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }
}