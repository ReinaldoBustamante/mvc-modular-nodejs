import { prisma } from "./config/db"

( async () => {
    try{
        const users = await prisma.user.findMany();
        console.log("Conexion con bd establecida");
        console.log("Cantidad de usuarios: ", users.length);
    }
    catch (error){
        console.log(error);
    }
})()