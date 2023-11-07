import { Injectable } from "@nestjs/common";
import axios from 'axios';


@Injectable()
export class StockService {


    async getStockData(): Promise<any> {

        try {
            const options = {
                method: 'GET',
                url: 'https://latest-stock-price.p.rapidapi.com/price',
                params: {
                    Indices: 'NIFTY 50',
                },
                headers: {
                    'X-RapidAPI-Key': '6ccd68c026mshf70a27591fac842p1cca2bjsn334f1d419d8f',
                    'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com',
                },
            };
            const response = await axios.request(options);


            console.log("Response", response.data);
            if (response.data && response.data.length) {
                (response.data);
            }
            return response.data
        } catch (error) {
            console.error("Error While Fetch Stocks", error);
        }
    };



}


