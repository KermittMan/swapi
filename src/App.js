import React, { Component } from 'react';
import './App.css'
import CardList from './components/CardList';
import SearchBox from './components/SearchBox';
import Scroll from './components/Scroll';

class App extends Component {
	constructor() {
		super()
		this.state = {
			starships: [],
			searchField: ''
		}
	}

	componentDidMount() {

		const urls = [
			'https://swapi.co/api/starships/?page=1',
			'https://swapi.co/api/starships/?page=2',
			'https://swapi.co/api/starships/?page=3',
			'https://swapi.co/api/starships/?page=4'
		]

		

		Promise.all(urls.map(url=>{
			return fetch(url).then(resp=>resp.json())
		})).then(array=>{
			for(let i =0;i<urls.length;i++){
				this.setState({starships: array.map(item => item.results).reduce((sum, cur) => sum.concat(cur), []) })
				console.log(array[i].results);
			}
		})

		// fetch('https://swapi.co/api/starships/10/')
		//   .then(response=> response.json())
		//   .then(starships=> this.setState({starships: starships}))
		
		// .catch(error => 
		// 	console.log('Error during fetching of starships:', error)
		// );
	}

	onSearchChange = (event) => {
		this.setState({ searchField: event.target.value })
		console.log(event.target.value);
	}

	render() {

		const { starships, searchField } = this.state;
		const filteredStarShips = starships.filter(starship=>{
			return starship.name.toLowerCase().includes(searchField.toLowerCase())
				|| starship.manufacturer.toLowerCase().includes(searchField.toLowerCase())
				|| starship.starship_class.toLowerCase().includes(searchField.toLowerCase())
		})

		return !starships.length ? 
			(
				<div className='tc'>
					<h1 className='loadingBar'>Loading</h1>
				</div>
			) :
			(
				<div className='tc'>
						<h1 className='f1'>STAR WARS STARSHIPS</h1>
						<SearchBox searchChange={this.onSearchChange}/>
						<Scroll>
							<CardList starships={filteredStarShips} />
						</Scroll>
				</div>
			);
	}
}

export default App;