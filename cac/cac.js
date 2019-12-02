var whiteList = []
//请求统一路径
var contextPath = "";
function cacInit() {
    $.ajaxSetup({
        headers: {
            "Authorization": "bearer " + localStorage.getItem("access_token"),
            "X-XSRF-TOKEN": cac.common.getCookie("XSRF-TOKEN")
        },
        statusCode: {
            401: function (data) {
                alert("会话过期，请您重新登录！")
                cac.loginUtil.logout()
            },
            403: function (data) {
                alert("会话过期，请您重新登录！")
                cac.loginUtil.logout()
            },
            499: function (data) {
                alert("会话过期，请您重新登录！")
                cac.loginUtil.logout()
            }
        }
    });
    $(document).ajaxSend(function (event, jqxhr, settings) {
        if (!(/^(http:\/\/)/.test(settings.url))) {
            settings.url = window.baseURL + settings.url
        }
    });
    if(!("undefined" == typeof Ext)) {
		if(Ext.Ajax){
			Ext.Ajax.defaultHeaders = {
				"Authorization": "bearer " + localStorage.getItem("access_token"),
				"X-XSRF-TOKEN": cac.common.getCookie("XSRF-TOKEN")
			};

			Ext.Ajax.handleFailure = function(response, e) {
				if (response.status === 401 || response.status === 403) {
					alert("会话过期，请您重新登录！")
					cac.loginUtil.logout()
				}
				this.transId = false;
				var options = response.argument.options;
				response.argument = options ? options.argument : null;
				this.fireEvent("requestexception", this, response, options, e);
				Ext.callback(options.failure, options.scope, [response, options]);
				Ext.callback(options.callback, options.scope, [options, false, response]);
			}
		}
    }

    for(var index in whiteList) {
        if (window.location.href.indexOf(whiteList[index]) != -1) {
            return;
        }
    }

    if (!cac.loginUtil.checkLogin()) {
        cac.loginUtil.login();
    }
}



    var baseOAuthUrl = "http://192.168.0.162:5041/cac" // 本地用这个
  //var baseOAuthUrl = "/cac";  // 发布时用这个

var path = window.location.pathname;
var firstIndex = path.indexOf("/");

if (firstIndex != -1) {
    var seconedIndex = path.indexOf("/", firstIndex + 1);
    contextPath = path.substring(firstIndex, (seconedIndex != -1)? seconedIndex: path.length);
    contextPath = (contextPath === "/cac" || contextPath  === "/")? "": contextPath
}

var localuri = window.location.origin + contextPath;
// alert(localuri+'')
var cac = {
    config: {
        // 请求授权地址
        userAuthorizationUri: baseOAuthUrl + '/oauth/authorize',
        // accessToken请求地址
        accessTokenUri: baseOAuthUrl + '/oauth/token',
        // 用户信息请求地址
        // userInfoUri: "https://api.github.com/user",
        tokenInfoUri: baseOAuthUrl + '/oauth/check_token',
        // 登出请求地址
        logoutUri: baseOAuthUrl + '/logout',
        // 本地地址
        localuri: localuri,
        // 服务端重定向地址
        redirect_uri: localuri + '/cac/login.html',
        // 案例资源服务器地址
        resUri: localuri,
        // 客户端相关标识，请从认证服务器申请
        clientId: 'cosmo-dds',
        client_secret: 'cosmo',
        // 申请的权限范围
        scope: 'all',
        // 一些固定的请求参数
        response_type: 'code',
        grant_type: 'authorization_code',
        code: ''
    },

    token: {
        savetoken: function(token) {
            localStorage.setItem('access_token', token.access_token)
            localStorage.setItem('enabled', token.enabled)
            localStorage.setItem('expires_in', token.expires_in)
            localStorage.setItem('refresh_token', token.refresh_token)
            localStorage.setItem('token_type', token.token_type)
            localStorage.setItem('scope', token.scope)
            localStorage.setItem('login_time', new Date().getTime())
        },
        deleteToken: function() {
            localStorage.setItem('access_token', null)
            localStorage.setItem('enabled', null)
            localStorage.setItem('expires_in', null)
            localStorage.setItem('refresh_token', null)
            localStorage.setItem('token_type', null)
        },
        loadToken: function() {
            var tokenInfo = {}
            tokenInfo.access_token = localStorage.getItem('access_token')
            tokenInfo.enabled = localStorage.getItem('enabled')
            tokenInfo.expires_in = localStorage.getItem('expires_in')
            tokenInfo.refresh_token = localStorage.getItem('refresh_token')
            tokenInfo.token_type = localStorage.getItem('token_type')
            tokenInfo.login_time = localStorage.getItem('login_time')
            return tokenInfo
        }
    },
    common: {
        random: function(length) {
            var result = "";
            length = length || 6;
            var codes = ["1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f",
                "g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C",
                "D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
            for (var i=0; i<length;i++) {
                result += codes[parseInt(Math.random()*62)];
            }
            return result;
        },
        getCookie: function(cookieName){
            var cookieValue="";
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].split("=");
                    if (cookie[0].trim() == cookieName.trim()) {
                        cookieValue = cookie[1].trim();
                        break;
                    }
                }
            }
            return cookieValue;
        }
    },
    loginUtil: {
        logout: function() {
            cac.token.deleteToken()
            window.location.href = cac.config.logoutUri + '?logout_redirect_uri=' + cac.config.localuri + '/'
        },
        login: function() {
            var state = cac.common.random();
            sessionStorage.setItem("state", state);
            var authorUrl = cac.config.userAuthorizationUri
            authorUrl = authorUrl+"?client_id="+cac.config.clientId+"&response_type="+cac.config.response_type+"&scope="+cac.config.scope+"&state="+state+"&redirect_uri="+cac.config.redirect_uri;
            window.location.href = authorUrl
        },
        checkLogin: function() {
            var tokenInfo = cac.token.loadToken()
            if (!tokenInfo.access_token || tokenInfo.access_token === 'null') {
                return false
            }
            if (tokenInfo.login_time + tokenInfo.expires_in * 1000 <= new Date().getTime()) {
                return false;
            }
            return true
        }
    },

    api: {
        getTokenFromService: function(code, callback) {
            var url = cac.config.accessTokenUri +
                "?client_id="+cac.config.clientId+"&client_secret="+cac.config.client_secret+"&grant_type="+cac.config.grant_type+"&code="+code+"&redirect_uri="+cac.config.redirect_uri;
            $.ajax({
                type:'post',
                url: url,
                headers: {
                    'X-XSRF-TOKEN': cac.common.getCookie("XSRF-TOKEN")
                },
                success:function(data){
                    callback(data);
                }
            })
        },
        getUserInfo: function(callback, error) {
            var url = cac.config.tokenInfoUri+"?token="+cac.token.loadToken().access_token+"&client_id="+cac.config.clientId+"&client_secret="+cac.config.client_secret;
            $.ajax({
                type:'post',
                url: url,
                headers: {
                    'X-XSRF-TOKEN': cac.common.getCookie("XSRF-TOKEN")
                },
                success:function(data){
                    callback(data);
                }
            })
        }
    }
}


function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
