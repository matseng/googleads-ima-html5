// http://stackoverflow.com/questions/3202849/how-to-intercept-every-ajax-request-from-a-webpage

var xml_type;
// branch for native XMLHttpRequest object
if(window.XMLHttpRequest && !(window.ActiveXObject)) {

   xml_type = 'XMLHttpRequest';

// branch for IE/Windows ActiveX version
} else if(window.ActiveXObject) {
  try {
        
        a = new ActiveXObject('Msxml2.XMLHTTP');
        
        xml_type = 'Msxml2.XMLHTTP';

    } catch(e) {

        a = new ActiveXObject('Microsoft.XMLHTTP');

        xml_type = 'Microsoft.XMLHTTP';
        
  }
    
}

var ActualActiveXObject = window.ActiveXObject;
var ActiveXObject;

if (xml_type == 'XMLHttpRequest') {
    
     (function(open) {
      XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
        alert('Intercept');
        open.call(this, method, url+".ua", async, user, pass);
      };
    })(XMLHttpRequest.prototype.open);
    
} else {

      ActiveXObject = function(progid) {
      var ax = new ActualActiveXObject(progid);
      
      if (progid.toLowerCase() == "microsoft.xmlhttp") {
        var o = {
          _ax: ax,
          _status: "fake",
          responseText: "",
          responseXml: null,
          readyState: 0,
          dataType: 'plain',
          status: 0,
          statusText: 0,
          onReadyStateChange: null,
          onreadystatechange: null
        };
        o._onReadyStateChange = function() {
          var self = o;
          return function() {     
            self.readyState   = self._ax.readyState;
            if (self.readyState == 4) {
            
              self.responseText = self._ax.responseText;
              self.responseXml  = self._ax.responseXml;
              self.status       = self._ax.status;
              self.statusText   = self._ax.statusText;
              
            }
            if (self.onReadyStateChange) {
                self.onReadyStateChange();
            }
            if (self.onreadystatechange) {
                self.onreadystatechange();
            }
          }
        }();
        o.open = function(bstrMethod, bstrUrl, varAsync, bstrUser, bstrPassword) {
          this._ax.onReadyStateChange = this._onReadyStateChange;       
          this._ax.onreadystatechange = this._onReadyStateChange;  
          alert('Intercept');
          return this._ax.open(bstrMethod, bstrUrl, varAsync, bstrUser, bstrPassword);
        };
        o.send = function(varBody) {
          return this._ax.send(varBody);
        };
        o.abort = function() {
            return this._ax.abort();
        }
        o.setRequestHeader = function(k,v) {
            return this._ax.setRequestHeader(k,v)
        }
        o.setrequestheader = function(k,v) {
            return this._ax.setRequestHeader(k,v)
        }
        o.getResponseHeader = function(k) {
            return this._ax.getResponseHeader(k)
        }
        o.getresponseheader = function(k) {
            return this._ax.getResponseHeader(k)
        }
        
      } else if (progid.toLowerCase() == "msxml2.xmlhttp") {
        var o = {
          _ax: ax,
          _status: "fake",
          responseText: "",
          responseXml: null,
          readyState: 0,
          dataType: 'plain',
          status: 0,
          statusText: 0,
          onReadyStateChange: null,
          onreadystatechange: null
        };
        o._onReadyStateChange = function() {
          var self = o;
          return function() {     
            self.readyState   = self._ax.readyState;
            if (self.readyState == 4) {
            
              self.responseText = self._ax.responseText;
              self.responseXml  = self._ax.responseXml;
              self.status       = self._ax.status;
              self.statusText   = self._ax.statusText;
              
            }
            if (self.onReadyStateChange) {
                self.onReadyStateChange();
            }
            if (self.onreadystatechange) {
                self.onreadystatechange();
            }
          }
        }();
        o.open = function(bstrMethod, bstrUrl, varAsync, bstrUser, bstrPassword) {
          this._ax.onReadyStateChange = this._onReadyStateChange;       
          this._ax.onreadystatechange = this._onReadyStateChange;    
          alert('Intercept');
          return this._ax.open(bstrMethod, bstrUrl, varAsync, bstrUser, bstrPassword);
        };
        o.send = function(varBody) {
          return this._ax.send(varBody);
        };
        o.abort = function() {
            return this._ax.abort();
        }
        o.setRequestHeader = function(k,v) {
            return this._ax.setRequestHeader(k,v)
        }
        o.setrequestheader = function(k,v) {
            return this._ax.setRequestHeader(k,v)
        }
        o.getResponseHeader = function(k) {
            return this._ax.getResponseHeader(k)
        }
        o.getresponseheader = function(k) {
            return this._ax.getResponseHeader(k)
        }

      } else {
        var o = ax;
      }
       
      return o;
    }
  }