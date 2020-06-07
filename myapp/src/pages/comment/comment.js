import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import { filterTime } from '../../filter/filter'
import axios from "axios"
import "./comment.css"

class Comment extends Component {
    constructor() {
        super()
        this.state = {
            longcomment: 0,
            shortcomment: 0,
            long: [],
            short: []
        }
    }

    componentDidMount() {
        const id = this.props.location.search.substr(4)
        axios({
            url: `/story/${id}/long-comments`,
            method: "get"
        }).then(res => {
            console.log(res.data)
            this.setState({
                longcomment: res.data.comments.length,
                long: res.data.comments
            }, () => { console.log(this.state.long) })
        })
        axios({
            url: `/story/${id}/short-comments`,
            method: "get"
        }).then(res => {
            console.log(res.data)
            this.setState({
                shortcomment: res.data.comments.length,
                short: res.data.comments
            }, () => { console.log(this.state.short) })
        })
    }

    back = () => {
        this.props.history.go(-1)
    }

    show = (e) =>{
        const shortlist=this.refs.shortlist
        const shortheight=window.getComputedStyle(shortlist).height
        const longlist=this.refs.longlist
        const longheight=window.getComputedStyle(longlist).height
        if(shortheight==="0px"&&e.currentTarget.className==='short-title'){
            shortlist.style.height="auto"
            longlist.style.height="0px"
        }else{
            shortlist.style.height="0px"
        }
        if(longheight==="0px"&&e.currentTarget.className==='long-title'){
            longlist.style.height="auto"
            shortlist.style.height="0px"
        }else{
            longlist.style.height="0px"
        }
    }

    render() {
        return (
            <div>
                <header className="comment-header">
                    <div className='back'>
                        <Icon type="ellipsis" onClick={() => { this.back() }} />
                        <span>{this.state.longcomment + this.state.shortcomment}条评论</span>
                    </div>
                    <div className="right">
                        <Icon type="ellipsis" />
                    </div>
                </header>
                <div className="short">
                    <div className='short-title' onClick={(e)=>{this.show(e)}} >{this.state.shortcomment}条短评</div>
                    <div className="short-list" ref="shortlist">
                        {this.state.short.length===0?<div className='backimage'>暂未有评论</div>:null}
                        {this.state.short.map((item) =>
                            <div className="list-item" key={item.id}>
                                <div className='avatar'>
                                    <img src={item.avatar} />
                                </div>
                                <div className='info'>
                                    <p className='name'>{item.author}</p>
                                    <p className='text'>{item.content}</p>
                                    <p className='time'>{filterTime(item.time)}</p>
                                </div>
                                <div className='like'>
                                    <Icon type="ellipsis" /><span>{item.likes}</span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <div className="long">
                    <div className='long-title' onClick={(e)=>{this.show(e)}}>{this.state.longcomment}条长评</div>
                    <div className="long-list" ref="longlist">
                    {this.state.long.length===0?<div className='backimage'>暂未有评论</div>:null}
                    {this.state.long.map((item) =>
                            <div className="list-item" key={item.id}>
                                <div className='avatar'>
                                    <img src={item.avatar} />
                                </div>
                                <div className='info'>
                                    <p className='name'>{item.author}</p>
                                    <p className='text'>{item.content}</p>
                                    <p className='time'>{filterTime(item.time)}</p>
                                </div>
                                <div className='like'>
                                    <Icon type="ellipsis" /><span>{item.likes}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;
