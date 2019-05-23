document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded!')
  
    let users = []
    const usersURL = 'http://localhost:3000/users'
    const divDropDown = document.querySelector('.dropdown')
    const divUserInfo = document.querySelector('.userInfo')
    const selectTag = document.createElement('select')


    let opTitle = document.createElement('option')
    opTitle.innerText = "Select a User"
    opTitle.selected = true
    opTitle.disabled = true
    selectTag.append(opTitle)

    function fetchingUsers(){
        //request data from server and call renderUser function for each user
        fetch(usersURL)
            .then((resp) => resp.json())
            .then((userlist) => {
                userlist.forEach((user) => renderUser(user))
            })
    }

    function renderUser(user){
        // creating and appending options to the selectTag for each User
        let option = document.createElement('option')
        option.innerText = user.name
        option.value = user.name
        selectTag.append(option)
        fetch(usersURL + "/" + `${user.id}`)
            .then((resp) => resp.json())
            .then((user) => {
                users.push(user)
            })
    }
    selectTag.addEventListener('change', (e) => {
        //find a user and Use userInfo class to show user Info inside 'user-info' div 
        let render = function(){
        let h4 = document.createElement('h4')
        let numberInput = document.createElement('input')
        numberInput.type = "number"
        numberInput.placeholder = "Insert Calories"
        let button = document.createElement('input')
        let reset = document.createElement('input')
        reset.type = "submit"
        reset.value = "Reset Calories"
        button.type = "submit"
        button.value = "Add Calories"
        divUserInfo.innerHTML = ""
        user = users.find((person) => person.name == e.target.value)
        h4.innerText = `Total Calories: ${user.calories.total_calories}`
        let x = new UserInfo(user.name, user.image, user.id)
        // debugger
        divUserInfo.append(x.renderUserInfo())
        divUserInfo.append(h4)
        divUserInfo.append(numberInput)
        divUserInfo.append(button)
        divUserInfo.append(reset)
        
        // const 
        // getting ready for manipuating calories
        
        
        button.addEventListener("click", (event) => {
            num = parseInt(user.calories.total_calories) + parseInt(document.querySelectorAll("input")[0].value)
            let update = new Calories(num, user.id)
            update.addToCalories()
            user.calories.total_calories = num
            // renderUser(user.name)
            // fetch(usersURL + "/" + `${user.id}`,{
            //     method: "PATCH",
            //     headers:{
            //         "Content-type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         "calories":{
            //             "total_calories": num
            //         }
            //     })
            // })
            document.querySelector("h4").innerText = `Total Calories: ${num}`
            
        })
        reset.addEventListener("click", (event) => {
            num = 0
            fetch(usersURL + "/" + `${user.id}`,{
                method: "PATCH",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    "calories":{
                        "total_calories": num
                    }
                })
            })
            document.querySelector("h4").innerText = `Total Calories: ${num}`
        })

        document.querySelector("h4").innerText = `Total Calories: ${user.calories.total_calories}`
        user.calories.total_calories = num
    }
    render()
})

    divDropDown.append(selectTag)
    fetchingUsers()
  
  })