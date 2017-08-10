import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoDetail from './components/video_detail';
const API_KEY = "AIzaSyCViDWvvhqMgRmwlxv6LehhTuToGNAu6x8";
import VideoList from './components/video_list';
import _ from 'lodash';



class App extends Component {
	constructor(props){
		super(props);

		this.state = { 
			videos:[],
			selectedVideo:null
		};
		this.videoSearch('A new hope');
	}

	videoSearch(term){
		YTSearch({key: API_KEY, term:term}, (videos)=> {
			this.setState({
				videos:videos,
				selectedVideo:videos[0]

			});
			//this.setState({videos:videos});
		});

	}
	render(){
		const videoSearch = _.debounce((term) => {this.videoSearch(term) },300);


		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList 
					onVideoSelect={selectedVideo =>this.setState({selectedVideo}) }
					videos={this.state.videos}/>
			</div>
		);
	}	
}

ReactDOM.render(<App />, document.querySelector('.container'));