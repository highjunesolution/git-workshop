type Users = {
  id: number;
  name: string;
  position: string;
  age: number;
  birthDate: Date,
};

const users: Users[] = [
    {
        id: 1,
        name: "Jirayu",
        age: 26,
        birthDate: new Date(2000, 6, 22),
        position: "IT Staff"
    }
]


const getUser = (id:number):Users | null => {
    return users.find((u)=>u.id === id) ?? null;
}

export const badFunction = (message:string)=> new Error(message);