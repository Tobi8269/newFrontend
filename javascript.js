// for frontend i have used react as a framework

'use strict';

class App extends React.Component {
	
 constructor(props) {
    super(props);
    this.state = {name: '',email: '',address: '',phone: '',book:[]};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleDelete = this.handleDelete.bind(this);
  }

// going out 

	componentDidMount() {
	fetch('https://mi-linux.wlv.ac.uk/~2058402/webproject/public/index.php/BookController/index')
	
		.then(res => res.json())
		.then((data) => {
		  this.setState({ book: data}) 
		})
		.catch(console.log)
	}
	
	
 handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  // to delete the data from the api
  handleDelete(e) {

	let id=e.target.id;		
	const sendlink= 'https://mi-linux.wlv.ac.uk/~2058402/webproject/public/index.php/BookController/delete/'+ id;
    const requestMetadata = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(sendlink, requestMetadata)
        .then(res => res.json())
        .then(recipes => {
            console.log(recipes);
		
			
		  });

    };
  handleSubmit(event) {

	
	 const sendlink =
      "https://mi-linux.wlv.ac.uk/~2058402/webproject/public/index.php/BookController/savedata";
  
    let addressForm = this.state;

    let formData = new FormData();
    formData.append("name", addressForm.name);
    formData.append("email", addressForm.email);
    formData.append("address", addressForm.address);
	formData.append("phone", addressForm.phone);

    fetch(sendlink, {
      method: "POST",
      body: formData,
    });
	componentDidMount();

  }
	
	render() {
	
		return (
			
	  <div>
 
			
		   <form class="form-inline" onSubmit={this.handleSubmit} method="post">
        <label>
          Name:
          <input class="form-control" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
		
		   <label>
          Email:
          <input class="form-control" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
        </label>
		   <label>
          Address:
          <input class="form-control" name="address" type="text" value={this.state.address} onChange={this.handleChange} />
        </label>
		   <label>
          Phone:
          <input class="form-control" name="phone" type="text" value={this.state.phone} onChange={this.handleChange} />
        </label>
		
        <button  name="add" type="submit" value="Submit"> Add</button>
      </form>
		
		
        <div className="container">
		<h1>Address Book project </h1>
		<div class="row">
	<ul>
          {this.state.book.map((data, index) => (        
		<li>name = {data.name}  gmail = {data.email}  address= {data.address}  phone= {data.phone}  <button type="button"   id={data.id} 
    onClick={this.handleDelete}>Cancel</button>  </li>
	
          ))}
         
		  </ul>
      
		  </div>
        </div>
      </div>
		);
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);