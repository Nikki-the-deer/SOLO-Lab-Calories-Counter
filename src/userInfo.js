class UserInfo{
    constructor(name, image, id){
        this.name = name
        this.image = image
        this.id = id
    }
   
    renderUserInfo(){
        let div = document.createElement('div')
        let p = document.createElement('p')
        let img = document.createElement('img')
        p.innerText = this.name
        img.src = this.image
        div.append(p)
        div.append(img)
        return div
    }


}