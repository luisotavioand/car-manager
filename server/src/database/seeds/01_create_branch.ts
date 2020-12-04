import Knex from 'knex';

export async function seed (knex: Knex) {
   await knex('brand').insert(
        [
            { name:"VOLKSWAGEN", country: "GERMANY"},
            { name:"BMW", country: "GERMANY"},
            { name:"AUDI", country: "GERMANY"},
            { name:"FIAT", country: "ITALY"},
            { name:"FORD", country: "USA"},
            { name:"CHEVROLET", country: "USA"},
            { name:"RENAULT", country: "FRANCE"},
            { name:"PEUGEOT", country: "FRANCE"},
            { name:"CITROEN", country: "FRANCE"},
            { name:"HONDA", country: "JAPAN"},
            { name:"HYUNDAI", country: "SOUTH COREA"},
            { name:"LAND HOVER", country: "UNITED KINGDON"},
            { name:"VOLVO", country: "SWEDEN"},
            { name:"MITSUBISHI", country: "JAPAN"},
            { name:"TOYOTA", country: "JAPAN"}
        ]
    );
}