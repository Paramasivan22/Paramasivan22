import Additems from "./Additems";
import Content from "./Content";
import Footer from"./Footer";
import Header from "./Header";
import { useState,useEffect } from 'react';
import Search from "./Search";
import apiRequest from "./apiRequest";



function App() {
  const API_URL = 'http://localhost:3500/items';
  const [items,setItems] = useState([]);
    const [newItems,setNewItem] = useState('')
    const[search,setSearch]=useState('')
    const [fetchError,setFetchError] = useState(null)
    const [isLoading,setIsLoading] = useState('true')

    useEffect(()=>{
      const fetchItems = async ()=> {
        try{
          const response = await fetch(API_URL);
          if(!response.ok) throw Error("Data not received ")
          const listItems = await response.json();
          console.log(listItems)
          setItems(listItems);
          setFetchError(null)
        }catch (err) {
          setFetchError(err.message)
        } finally{
          setIsLoading(false)
        }
      }
      setTimeout(()=> {
        (async () => await fetchItems())()
      },2000)
    }, [])



    const addItem = async (item)=> {
      const id = items.length ? items[items.length-1].id+1:1;
      const addNewItem = {id,checked:false,item}
      const listItems = [...items,addNewItem]
      setItems(listItems)
     
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(addNewItem)
      }

      const result = await apiRequest(API_URL,postOptions)
      if(result) setFetchError(result)

    }





    const handleCheck = async (id) => {
      const listItems = items.map((item)=>
       item.id===id ? {...item,checked:!item.checked}:item)
      setItems(listItems)

      const myItem = listItems.filter ((item) => item.id == id)

      const ubdateOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({checked:myItem[0].checked})
      }

      const reqUrl = `${API_URL}/${id}`

      const result = await apiRequest(reqUrl,ubdateOptions)
      if(result) setFetchError(result)



    }
    const handledelete = async (id) => {
      const listItems = items.filter((item)=>
      item.id!==id)
      setItems (listItems)
      
      const deleteOptions = {method: 'DELETE'}

      const reqUrl = `${API_URL}/${id}`

      const result = await apiRequest(reqUrl,deleteOptions)
      if(result) setFetchError(result)


    }
    const handleSubmit = (e)=>{
      e.preventDefault()
      if(!newItems) return;
      
      addItem(newItems)
      setNewItem('')
    }
  
 
  return (
    <div className="App">
      <Header title = "Cource List" />
      <Additems
      newItems={newItems}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      />
     <Search
     search={search}
     setSearch={setSearch}
     />

     <main>
     {isLoading && <p>Loading Items..</p>} 
      {fetchError && <p>{`Error: ${fetchError}`}</p>}


        {!isLoading && !fetchError && <Content 
          items={items .filter(item => (item.item).toLowerCase().includes(search.toLowerCase()))}
          handleCheck={handleCheck}
        handledelete={handledelete}
          /> }
        </main>
      <Footer
      length={items.length}
      />
    </div>
  );
}

export default App;
