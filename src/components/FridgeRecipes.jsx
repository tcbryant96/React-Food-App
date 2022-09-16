import React, {useEffect, useState} from 'react'


export default function FridgeRecipes() {
    let [recipes, setRecipes] = useState([])
    // useEffect(() => {
    //     let token = localStorage.token
    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", "Bearer " + token);
    
    //     var requestOptions = {
    //       method: 'GET',
    //       headers: myHeaders,
    //       redirect: 'follow'
    //     };
    
    //     fetch("http://localhost:5000/api/fridge/user", requestOptions)
    //       .then(response => response.json())
    //       .then(result => console.log(result))
    //       .then(l => console.log(l))
    //       .catch(error => console.log('error', error));

    
    //   })
    //   let itemGrab = async (result) => {
    //     console.log(result)
    //     let l = [result[0].item]
    //     for (let i=1; i < result.length; i++){
    //         l.push(`%2C%20${result[i].item}`)
    //     }
    //     let itemUrl = l.join('')
    //     // let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${itemUrl}&app_id=1c456c6c&app_key=ab7e991bd941a2edff4bc35495224221`)
    //     let data = await response.json()
    //     console.log(data)


    //     var myRecipes = []
    //     for (let i=0; i<data.hits.length; i++){
    //         console.log(data.hits[i])
    //         for (let j=0; i<data.hits[i].recipes.ingredients.length; j++)
    //         {
    //             for (let q =0; q<result.length;q++){
    //                 console.log()
    //             if (result[q].item in data.hits[i].recipes.ingredients[j].text){
    //                 console.log('hi')
    //                 if (data.hits[i].recipe.ingredients[j].quantity < result[q].quantity){
    //                     myRecipes.push(data.hits[i])
    //                 }
    //             }
    // }
    //             }
    //         }
        
    //     return itemUrl
    //   }
  return (
    <div>FridgeRecipes</div>
  )
}
