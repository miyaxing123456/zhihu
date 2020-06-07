import React, { Component } from 'react'
import { Icon } from 'antd-mobile';
import './share.css'

class Share extends Component {

    cancel=()=>{
        const {onCancel} = this.props
        onCancel()
    }

    render() {
        return (
            <div className='share'>
                <div className='main'>
                    <div className='share-item'>
                        <div className='icon'><Icon type="ellipsis" /></div>
                        <span>新浪微博</span>
                    </div>
                    <div className='share-item'>
                        <div className='icon'><Icon type="ellipsis" /></div>
                        <span>新浪微博</span>
                    </div>
                    <div className='share-item'>
                        <div className='icon'><Icon type="ellipsis" /></div>
                        <span>新浪微博</span>
                    </div>
                    <div className='share-item'>
                        <div className='icon'><Icon type="ellipsis" /></div>
                        <span>新浪微博</span>
                    </div>
                    <div className='share-item'>
                        <div className='icon'><Icon type="ellipsis" /></div>
                        <span>新浪微博</span>
                    </div>
                    <div className='share-item'>
                        <div className='icon'><Icon type="ellipsis" /></div>
                        <span>新浪微博</span>
                    </div>
                    <div className='share-item'>
                        <div className='icon'><Icon type="ellipsis" /></div>
                        <span>新浪微博</span>
                    </div>
                    <div className='share-item'>
                        <div className='icon'><Icon type="ellipsis" /></div>
                        <span>新浪微博</span>
                    </div>
                    <div className='share-item'>
                        <div className='icon'><Icon type="ellipsis" /></div>
                        <span>新浪微博</span>
                    </div>
                    <div className='share-item'>
                        <div className='icon'><Icon type="ellipsis" /></div>
                        <span>新浪微博</span>
                    </div>
                    <div className='share-item'>
                        <div className='icon'><Icon type="ellipsis" /></div>
                        <span>新浪微博</span>
                    </div>
                </div>
                <div className='mask' onClick={()=>{this.cancel()}}></div>
            </div>
        )
    }
}

export default Share;