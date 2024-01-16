import axios from 'axios'
import swal from 'sweetalert';
import swal2 from 'sweetalert2';
//import { getUser } from '../slices/userSlice';
import { getblogDetailSlice } from '../slices/blogDetailSlice';
import { getblogAll } from '../slices/blogAll';
const apiUrl = import.meta.env.VITE_API_URL;


export const createBlog = (data) => async (dispatch) =>{
    try {
        let userData = JSON.parse(localStorage.getItem('userData'))
        let token = userData.user

        let res = await axios.post(`${apiUrl}/user/create`, data,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let id = res.data.newPostBlog.id
        if(res.data.message){
            swal("",res.data.message, "success")
            .then(() => {
                window.location.href = `/blog/blogPage/${id}`;
            });
        } else {
            console.log("error")
        }    
    } catch (e) {
        let respuesta = JSON.parse(e.request.response).message;
        if(respuesta){
           swal(respuesta) 
           
        }
        else(swal("Ocurrio un error"))
    }
}

export const editBlog = (data) => async (dispatch) =>{
    try {
        let userData = JSON.parse(localStorage.getItem('userData'))
        let token = userData.user

        let res = await axios.post(`${apiUrl}/user/edit`, data,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let id = data.postId
        if(res.data.message){
            swal("",res.data.message, "success")
            .then(() => {
                window.location.href = `/blog/blogPage/${id}`;
            });
        } else {
            console.log("error")
        }    
    } catch (e) {
        console.log(e)
        let respuesta = JSON.parse(e.request.response).message;
        if(respuesta){
           swal(respuesta) 
           
        }
        else(swal("Ocurrio un error"))
    }
}

export const getBlogDetail =(id)=> async (dispatch) => {
    try{
        let res = await axios.get(`${apiUrl}/user/blog/${id}`) //xd
        dispatch(getblogDetailSlice(res.data))
    }catch(e){
        console.log(e)
        swal("El Blog ya no existe!", "")
            .then(() => {
                window.location.href = "/blog";
            });
    }
  }


  export const getAllBlogs =(id)=> async (dispatch) => {
    try{
        let res = await axios.get(`${apiUrl}/user/allBlogs`) //xd
        dispatch(getblogAll(res.data))
    }catch(e){
        console.log(e)
        
    }
  }

  export const deleteBlog = (id) => async (dispatch) => {
    try {
    let userData = JSON.parse(localStorage.getItem('userData'))
    let token = userData.user

      const result = await swal2.fire({
        title: "¿Estás seguro que quieres eliminar este post?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      });
  
      if (!result.isConfirmed) {
        return; // No hacer nada si el usuario cancela
      }

      let res = await axios.delete(`${apiUrl}/user/delete/${id}`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    });

      dispatch(getAllBlogs());
  
      if (res.data.message) {
        await swal2.fire("", res.data.message, "success");
        // Aquí puedes realizar alguna acción adicional después de eliminar
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
      let respuesta = JSON.parse(e.request.response).message;
      if (respuesta) {
        await swal2.fire(respuesta);
      } else {
        await swal2.fire("Ocurrió un error");
      }
    }
  };

  export const getPaginatedBlogs = (page,perPage,query) => async (dispatch) => {
    try {
      page || 1; // Página actual (puedes ajustarla según tus necesidades)
      perPage || 3; // Cantidad de posts por página
      const searchQuery = query || ''; // Consulta de búsqueda por título o tag
  
      const res = await axios.get(`${apiUrl}/user/paginado`, {
        params: {
          page,
          perPage,
          search: searchQuery,
        }
      });
  
      dispatch(getblogAll(res.data));
    } catch (e) {
      console.log(e);
    }
  };