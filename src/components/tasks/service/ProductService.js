import axios from "axios";

export class ProductService {
    getProducts() {
        let tasks;
        //     = ({
        //     "data": [
        //         {
        //             "id": "6181a00523aae632297e6969", "ownerId": "61798b01158b6e71a95855a2", "title": "Test new function4", "taskDescription": "Hi Marek. You need to test some new function which other developer create", "done": false, "estimatedTime": null, "createDate": "2021/11/02 21:31:01", "doneDate": null
        //         }
        //     ]
        // });
        //     = ({
        //     "data": [
        //         {"id": "1000","title": "f230fh0g3","name": "Bamboo Watch","description": "Task Description","image": "bamboo-watch.jpg","complexity": 1,"dueDate": "2021-07-01","quantity": 24,"inventoryStatus": "Testing","rating": 5,"orders": [{"id": "1000","productCode": "f230fh0g3","date": "2020-09-13","amount": 65,"quantity": 1,"customer": "David James","status": "PENDING"},{"id": "1001","productCode": "f230fh0g3","date": "2020-05-14","amount": 130,"quantity": 2,"customer": "Leon Rodrigues","status": "DELIVERED"},{"id": "1002","productCode": "f230fh0g3","date": "2019-01-04","amount": 65,"quantity": 1,"customer": "Juan Alejandro","status": "RETURNED"},{"id": "1003","productCode": "f230fh0g3","date": "2020-09-13","amount": 195,"quantity": 3,"customer": "Claire Morrow","status": "CANCELLED"}]},
        //         {"id": "1001","title": "nvklal433","name": "Black Watch","description": "Task Description","image": "black-watch.jpg","complexity": 2,"dueDate": "2021-07-01","quantity": 61,"inventoryStatus": "InProgress","rating": 4,"orders": [{"id": "2000","productCode": "nvklal433","date": "2020-05-14","amount": 72,"quantity": 1,"customer": "Maisha Jefferson","status": "DELIVERED"},{"id": "2001","productCode": "nvklal433","date": "2020-02-28","amount": 144,"quantity": 2,"customer": "Octavia Murillo","status": "PENDING"}]},
        //         {"id": "1002","title": "zz21cz3c1","name": "Blue Band","description": "Task Description","image": "blue-band.jpg","complexity": 3,"dueDate": "2021-07-01","quantity": 2,"inventoryStatus": "Done","rating": 3,"orders": [{"id": "3000","productCode": "zz21cz3c1","date": "2020-07-05","amount": 79,"quantity": 1,"customer": "Stacey Leja","status": "DELIVERED"},{"id": "3001","productCode": "zz21cz3c1","date": "2020-02-06","amount": 79,"quantity": 1,"customer": "Ashley Wickens","status": "DELIVERED"}]},
        //         {"id": "1003","title": "244wgerg2","name": "Blue T-Shirt","description": "Task Description","image": "blue-t-shirt.jpg","complexity": 4,"dueDate": "2021-07-01","quantity": 25,"inventoryStatus": "InProgress","rating": 5,"orders": []},
        //         {"id": "1004","title": "h456wer53","name": "Bracelet","description": "Task Description","image": "bracelet.jpg","complexity": 3,"dueDate": "2021-07-01","quantity": 73,"inventoryStatus": "InProgress","rating": 4,"orders": [{"id": "5000","productCode": "h456wer53","date": "2020-09-05","amount": 60,"quantity": 4,"customer": "Mayumi Misaki","status": "PENDING"},{"id": "5001","productCode": "h456wer53","date": "2019-04-16","amount": 2,"quantity": 30,"customer": "Francesco Salvatore","status": "DELIVERED"}]},
        //         {"id": "1005","title": "av2231fwg","name": "Brown Purse","description": "Task Description","image": "brown-purse.jpg","complexity": 1,"dueDate": "2021-07-01","quantity": 0,"inventoryStatus": "Waiting","rating": 4,"orders": [{"id": "6000","productCode": "av2231fwg","date": "2020-01-25","amount": 120,"quantity": 1,"customer": "Isabel Sinclair","status": "RETURNED"},{"id": "6001","productCode": "av2231fwg","date": "2019-03-12","amount": 240,"quantity": 2,"customer": "Lionel Clifford","status": "DELIVERED"},{"id": "6002","productCode": "av2231fwg","date": "2019-05-05","amount": 120,"quantity": 1,"customer": "Cody Chavez","status": "DELIVERED"}]},
        //         {"id": "1006","title": "bib36pfvm","name": "Chakra Bracelet","description": "Task Description","image": "chakra-bracelet.jpg","complexity": 1,"dueDate": "2021-07-01","quantity": 5,"inventoryStatus": "Done","rating": 3,"orders": [{"id": "7000","productCode": "bib36pfvm","date": "2020-02-24","amount": 32,"quantity": 1,"customer": "Arvin Darci","status": "DELIVERED"},{"id": "7001","productCode": "bib36pfvm","date": "2020-01-14","amount": 64,"quantity": 2,"customer": "Izzy Jones","status": "PENDING"}]},
        //         {"id": "1007","title": "mbvjkgip5","name": "Galaxy Earrings","description": "Task Description","image": "galaxy-earrings.jpg","complexity": 2,"dueDate": "2021-07-01","quantity": 23,"inventoryStatus": "InProgress","rating": 5,"orders": [{"id": "8000","productCode": "mbvjkgip5","date": "2020-06-19","amount": 34,"quantity": 1,"customer": "Jennifer Smith","status": "DELIVERED"}]},
        //         {"id": "1008","title": "vbb124btr","name": "Game Controller","description": "Task Description","image": "game-controller.jpg","complexity": 3,"dueDate": "2021-07-01","quantity": 2,"inventoryStatus": "Done","rating": 4,"orders": [{"id": "9000","productCode": "vbb124btr","date": "2020-01-05","amount": 99,"quantity": 1,"customer": "Jeanfrancois David","status": "DELIVERED"},{"id": "9001","productCode": "vbb124btr","date": "2020-01-19","amount": 198,"quantity": 2,"customer": "Ivar Greenwood","status": "RETURNED"}]},
        //         {"id": "1009","title": "cm230f032","name": "Gaming Set","description": "Task Description","image": "gaming-set.jpg","complexity": 1,"dueDate": "2021-07-01","quantity": 63,"inventoryStatus": "InProgress","rating": 3,"orders": [{"id": "10000","productCode": "cm230f032","date": "2020-06-24","amount": 299,"quantity": 1,"customer": "Kadeem Mujtaba","status": "PENDING"},{"id": "10001","productCode": "cm230f032","date": "2020-05-11","amount": 299,"quantity": 1,"customer": "Ashley Wickens","status": "DELIVERED"},{"id": "10002","productCode": "cm230f032","date": "2019-02-07","amount": 299,"quantity": 1,"customer": "Julie Johnson","status": "DELIVERED"},{"id": "10003","productCode": "cm230f032","date": "2020-04-26","amount": 299,"quantity": 1,"customer": "Tony Costa","status": "CANCELLED"}]}
        //     ]
        // });

        axios.get('http://localhost:8080/api/v1/task/all', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGFtIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6InN0dWRlbnQ6d3JpdGUifSx7ImF1dGhvcml0eSI6InN0dWRlbnQ6cmVhZCJ9LHsiYXV0aG9yaXR5IjoiY291cnNlOnJlYWQifSx7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSx7ImF1dGhvcml0eSI6ImNvdXJzZTp3cml0ZSJ9XSwiaWF0IjoxNjM1ODg0NTMzLCJleHAiOjE2MzcwMTcyMDB9.LjCWddu_g7wHknD8_oelkoEZv8UGHJ1EojCQmlZgtKE'
            }
        }).then(
            res => {
                console.log("some res data: " + JSON.stringify(res));
                tasks = res.data;
            }
        );

        return tasks;
    }
}