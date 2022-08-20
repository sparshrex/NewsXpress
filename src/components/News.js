import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'
import Newsitems from './Newsitems'

import PropTypes from 'prop-types'


export default class News extends Component {
  
    constructor() {
        super();
        console.log("HEllo i am constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=74f343ebc5474376a2a9c7d7b032411c&page=1`
        let data = await fetch(url)
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults : parsedData.totalResults
        })
    }

    handlePrev = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country${this.props.country}&category=${this.props.category}&apiKey=74f343ebc5474376a2a9c7d7b032411c&page=${this.state.page - 1}&pagesize=18`;
        let data = await fetch(url)
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })

    }
    handleNext = async () => {
        if(Math.ceil( this.state.page+1>this.state.totalResults/18))
        {

        }
        else{

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=74f343ebc5474376a2a9c7d7b032411c&page=${this.state.page + 1}&pagesize=18`
            let data = await fetch(url)
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }
    render() {

        return (
            <div className="container my-3">
                <h2>NewXpress</h2>
                <div className="row">

                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}

                </div>
                <div className="container  d-flex justify-content-between">

                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrev}> &larr;Prev</button>
                    <button disabled={Math.ceil( this.state.page+1>this.state.totalResults/18)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr; </button>
                </div>

            </div>
        )
    }
}
