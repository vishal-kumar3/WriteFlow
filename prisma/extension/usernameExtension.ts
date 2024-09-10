// import { PrismaClient } from '@prisma/client/edge'


// const prismaExtended = new PrismaClient().$extends({
//   name: "username Default",
//   query: {
//     user: {
//       async create({model, args, query}){
//         if(!args.data.username){
//           args.data.username = `${args.data.name?.split(" ").join("").toLowerCase()}@${Math.floor(1000 + Math.random() * 9000)}`
//         }

//         return query(args)
//       }
//     }
//   }
// })

// export default prismaExtended
