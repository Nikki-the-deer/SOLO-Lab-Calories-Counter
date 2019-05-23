class Calories{
    constructor(calories, userId){
        this.calories = calories
        this.userId = userId
    }
    addToCalories(){
        const usersURL = 'http://localhost:3000/users'
        fetch(usersURL + "/" + `${this.userId}`,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "calories":{
                    "total_calories": this.calories
                }
            })
        })


        // return value
    }

}