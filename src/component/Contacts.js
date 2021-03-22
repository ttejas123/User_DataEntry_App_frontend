import ContactForm from "./ContactForm.js";
import React, {useState, useEffect} from "react";
import axios from 'axios';

const Contact=()=>{
	const [contactObject, setContactObject] = useState({});
	const [currentId, setCurrentId] = useState('');
	//get data from fireBase DataBase and store in setContactObject
	useEffect(()=>{
		axios.get("http://localhost:3001/read").then((result)=>{
			console.log(result.data);
			setContactObject({
 				...result.data
		    })
		})
	},[])
	//this is Done now !!

	// useEffect(()=>{
	// 	firebase.child(`Contact`).on('value', snapshot=>{
	// 		if(snapshot.val()){
	// 			setContactObject({
	// 				...snapshot.val()
	// 			})
	// 		}
	// 	})
	// },[])


	//Store data into firebase, or update data into database
	const addOrEdit = (obj) =>{
		if(currentId==""){
			console.log("This is for Update Data");
			axios.post('http://localhost:3001/insert',{
		      Data:obj,
		    })
		    setCurrentId("")
		}else{
			console.log("we are going in right direction");
			axios.post('http://localhost:3001/update',{
		      Data:obj,
		    })
		    setCurrentId("")
		}
	}
	const onDelete=(id)=>{
		console.log(id);
		axios.post('http://localhost:3001/delete',{
		      deleteId: id,
		  })
		window.location.reload();
	}
	  return (
	  	<>
		  	<div className="jumbotron jumbotron-fluid">
			  <div className="container">
			    <h1 className="display-4 text-center">User Curd</h1>
			  </div>
			</div>
			<div className="row">
				<div className="col-md-5">
					<ContactForm {...({addOrEdit, currentId, contactObject})} />
				</div>
				<div className="col-md-7">
					<table className="table table-borderless table-stripped">
						<thead className="thead-light">
							<th>full Name</th>
							<th>mobile</th>
							<th>Email</th>
                            <th>Action</th>
						</thead>
						<tbody>
							{
								Object.keys(contactObject).map(id =>{
									return <tr key={contactObject[id]._id}>
										<td>{contactObject[id].fullName}</td>
										<td>{contactObject[id].mobile}</td>
										<td>{contactObject[id].email}</td>
										<td> 
											<a className="btn text-primary" onClick={()=>{setCurrentId(id)}}>
												<i className="fas fa-pencil-alt"/>
											</a>
											<a className="btn text-danger" onClick={()=>{onDelete(contactObject[id]._id)}}>
												<i className="fas fa-trash-alt"/>
											</a>
										</td>
									</tr>
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		</>
	  	);
}

export default Contact;