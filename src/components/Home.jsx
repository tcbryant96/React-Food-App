import React, {useEffect, useState} from 'react'
import SearchForm from './SearchForm'
import SideBarLeft from './SideBarLeft'
import Recipes from './Recipes'
import "../App.css"
import MyNavbar2 from './MyNavbar2'

export default function Home(props) {
    let [searchList, setSearchList] = useState([])
    let [recipes, setRecipes] = useState([])
    useEffect(()=>{
        setRecipes(recipes)
        console.log("homeuseEffect")
        console.log(recipes)
    }, [recipes])

    let handleSingleSearch = async e =>{
        e.preventDefault()
        let item = e.target.singleSearch.value

        let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${item}&app_id=1c456c6c&app_key=ab7e991bd941a2edff4bc35495224221`)
        let data = await response.json()
        setRecipes(data.hits)
        
    }
    let handleMinMaxSearch = async e => {
        e.preventDefault()
        let min = e.target.min.value 
        let max = e.target.max.value
        let item = e.target.itemByInt.value
        if (min > 0 && max > 0){
            console.log("both")
            let response = await fetch (`https://api.edamam.com/api/recipes/v2?type=public&q=${item}&app_id=1c456c6c&app_key=ab7e991bd941a2edff4bc35495224221&ingr=${min}-${max}`)
            let data = await response.json()
            let newData = []
            for (let i=0; i<data.hits.length; i++){
                console.log(i)
                for (let j=0; j<data.hits[i].recipe.ingredients.length; j++){
                    if (data.hits[i].recipe.ingredients[j].food.includes(item)){
                        console.log(data.hits[i].recipe.ingredients[j].food)
                        if (data.hits[i].recipe.ingredients[j].quantity <= max && data.hits[i].recipe.ingredients[j].quantity >= min ){ 
                            newData.push(data.hits[i])
                            
                        }
                    }
                }

            }
            console.log(newData)
            setRecipes(newData)
        }
        else if(min > 0){
            let response = await fetch (`https://api.edamam.com/api/recipes/v2?type=public&q=${item}&app_id=1c456c6c&app_key=ab7e991bd941a2edff4bc35495224221&ingr=${min}%2B`)
            let data = await response.json()
            let newData = []
            for (let i=0; i<data.hits.length; i++){

                for (let j=0; j<data.hits[i].recipe.ingredients.length; j++){
                    if (data.hits[i].recipe.ingredients[j].food.includes(item)){

                        if (data.hits[i].recipe.ingredients[j].quantity >= min ){
                            console.log(data.hits[i].recipe.label, data.hits[i].recipe.ingredients[j].food, data.hits[i].recipe.ingredients[j].quantity)    
                            newData.push(data.hits[i])
                            
                        }
                    }
                }

            }
            setRecipes(newData)
        }
        else if(max > 0) {
            let response = await fetch (`https://api.edamam.com/api/recipes/v2?type=public&q=${item}&app_id=1c456c6c&app_key=ab7e991bd941a2edff4bc35495224221&ingr=${max}`)
            let data = await response.json()
            let newData= []
    
            for (let i=0; i<data.hits.length; i++){
                for (let j=0; j<data.hits[i].recipe.ingredients.length; j++){
                    if (data.hits[i].recipe.ingredients[j].food.includes(item)){
                        if (max >= data.hits[i].recipe.ingredients[j].quantity){ 
                            newData.push(data.hits[i])
                            
                        }
                    }
                }

            }
            console.log(newData)
            setRecipes(newData)
        }
        else{
            let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${item}&app_id=1c456c6c&app_key=ab7e991bd941a2edff4bc35495224221`)
            let data = await response.json()
            setRecipes(data.hits)
        }
        

    }
    let handleMultiSearch = async e => {
        e.preventDefault()
        console.log('multisearch')
        let item = [searchList[0]]
        for(let i=1; i<searchList.length; i++){
            item.push(`%2C%20${searchList[i]}`)
            
        }
        let itemUrl = item.join('')
        console.log(itemUrl)
        let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${itemUrl}&app_id=1c456c6c&app_key=ab7e991bd941a2edff4bc35495224221`)
        let data = await response.json()
        console.log(data.hits)
        setRecipes(data.hits)
        
        setSearchList([])

    }
    let scrollUp = () => {
        window.scrollTo(0, 0)
    }
    return (
        <>
            <div>
                <div className='row '>
                    <div className='col d-flex align-items-stretch'>
                        <SideBarLeft />
                    </div>
                    <div className='col me-3 d-flex align-items-stretch justify-content-center'>

                        <SearchForm className="mb-3 container-fluid" handleSingleSearch={handleSingleSearch} handleMinMaxSearch={handleMinMaxSearch} handleMultiSearch={handleMultiSearch} setSearchList={setSearchList} setRecipes={setRecipes} searchList={searchList}/>

                    </div>


                </div>
                <div className=" sticky-top">
                    <MyNavbar2 scrollUp={scrollUp} />
                </div>

                <div className='row '>
                    <div className='col'>
                        <Recipes recipes={recipes} />
                    </div>

                </div>
            </div>
        </>
    )
}
