import React, { useState, useEffect, useRef, createRef } from 'react';
const csrf = window.document.querySelector('meta[name="_csrf_token"]').getAttribute('content');
/*

 {/* 登录
        <form action="/passport/login" method="post">
            <label for="fname">账户</label>
            <input type="text" id="usernameField" name="username"><br><br>
            <label for="lname">密码</label>
            <input type="text" id="passwordField" name="password"><br><br>
            <input type="submit" value="Submit">
            </form> */

const App = () => {
    return (<div className="login-page">
        <div className='title'>养生堂后台管理系统</div>
        <form action={`/passport/login?_csrf=${csrf}`} method="post">
            <div className='area'>
                <label>账户：</label>
                <input type="text" id="usernameField" name="username" />
            </div>
            <div className='area'>
                <label >密码：</label>
                <input type="text" id="passwordField" name="password" />
            </div>
            <div className='login-area'>
                <input type='submit' className='login' value='submit' />
            </div>
        </form>
    </div>);
};

export default App;