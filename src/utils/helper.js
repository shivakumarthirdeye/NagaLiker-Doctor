import jwtDecode from 'jwt-decode';

export const checkTokens = () => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return false;
    }

    // first check, if you have a valid access_token
    if (accessToken) {
      // accessToken may be invalid, or expired, or no refreshToken or refreshToken present or refreshToken may be invalid
      try {
        // decode the token
        // invalid or malformed token will throw error
        const atoken = jwtDecode(accessToken);

        let exp = null;

        if (atoken && atoken?.exp) {
          exp = atoken.exp;
        }

        // if no exp date or expired exp date
        if (!exp || exp < new Date().getTime() / 1000) {
          // invalid accessToken
          // now check for refreshToken
          if (refreshToken) {
            const rtoken = jwtDecode(refreshToken);
            let exp = null;

            if (rtoken && rtoken?.exp) {
              exp = rtoken.exp;
            }

            // if no exp date or expired exp date

            if (!exp || exp < new Date().getTime() / 1000) {
              return false;
            }
          } else {
            return false;
          }
        }
      } catch {
        // invalid accessToken
        // now check for refreshToken
        if (refreshToken) {
          const rtoken = jwtDecode(refreshToken);

          let exp = null;

          if (rtoken && rtoken?.exp) {
            exp = rtoken.exp;
          }

          // if no exp date or expired exp date
          if (!exp || exp < new Date().getTime() / 1000) {
            return false;
          }
        } else {
          return false;
        }
      }
    } else {
      // we have refreshToken
      // check if refreshToken exists or not
      const rtoken = jwtDecode(refreshToken);
      let exp = null;

      if (rtoken && rtoken?.exp) {
        exp = rtoken.exp;
      }

      // if no exp date or expired exp date
      if (!exp || exp < new Date().getTime() / 1000) {
        return false;
      }
    }

    // valid token
    return true;
  } catch (e) {
    return false;
  }
};

export const getTokens = () => {
  // check if the user has a valid or a access_token refresh_token
  if (checkTokens()) {
    return {
      accessToken: localStorage.getItem('accessToken'),
    };
  }

  removeTokens();
  removeUser();

  return {
    accessToken: null,
    refreshToken: null,
  };
};

export const saveTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
};

// fn to save new access token
export const saveAccessTokens = accessToken => {
  localStorage.setItem('accessToken', accessToken);
};

// fn to remove tokens
export const removeTokens = () => {
  localStorage.removeItem('accessToken');
};

export const saveUser = user => {
  localStorage.setItem('LAB_DOCTOR', JSON.stringify(user));
};
export const removeUser = user => {
  localStorage.removeItem('LAB_DOCTOR');
};

export const getUser = () => {
  if (checkTokens()) {
    return JSON.parse(localStorage.getItem('LAB_DOCTOR'));
  }

  removeTokens();
  removeUser();
  return {
    user: null,
  };
};

export const getCurrency = (amount, decimal) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',

    minimumFractionDigits: decimal ? 2 : 0,
  });
};

export const handleError = err => {
  let message =
    typeof err?.response !== 'undefined'
      ? err?.response?.data?.error || err?.response?.data?.message
      : err?.message;

  const res = err.response;

  if (res && res.status === 401) {
    // removeTokens();
    // window.location.href = '/login';
  } else if (res && res.status === 400) {
    return message;
  } else if (res && res.status === 403) {
    message = message || 'You are not authorized to perform this action';
  } else if (res && res.status === 404) {
    message = message || 'Resource not found';
  } else if (res && res.status === 500) {
    message = 'Internal server error';
  } else if (res && res.status === 0 && !navigator.onLine) {
    message = 'OFFLINE!, Please Check your internet connection';
  } else if (res && res.status === 0 && navigator.onLine) {
    message = 'SERVER DOWN, Please try again later.';
  } else {
    return message;
  }

  return message;
};

export const calculateGST = amount => {
  // Assuming the amount is stored in a variable called "amount"
  let gst = amount * 0.05; // Calculate 5% of the amount as GST
  return amount + gst; // Add GST to the amount to get the total amount
};

export const checkIsAdmin = user => {
  if (user.role === 'admin') {
    return true;
  }
  return false;
};

// export const statusColor = {
//   'Valid Email': '#33B5A6',
//   'Valid Emails': '#33B5A6',
//   'Total Email': '#72A7FF',
//   Unknown: '#D7AF61',
//   'Invalid Email': '#D76761',
//   'Invalid Emails': '#D76761',
//   'Catch All': '#D76761',
// };

export const statusColor = (status, opacity = 1) => {
  const colors = {
    'Valid Email': `rgb(51, 181, 166,${opacity})`,
    'Valid Emails': `rgb(51, 181, 166,${opacity})`,
    'Total Email': `rgb(114, 167, 255,${opacity})`,
    Unknown: `rgb(215, 175, 97,${opacity})`,
    'Invalid Email': `rgb(215, 103, 97,${opacity})`,
    'Invalid Emails': `rgb(215, 103, 97,${opacity})`,
    'Catch All': `rgb(215, 103, 97,${opacity})`,
    Free: `rgb(100, 167, 221,${opacity})`,
    Disposable: `rgb(164, 92, 255,${opacity})`,
  };

  return colors[status];
};


export const  formatDate=(dateString)=> {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', options);
  
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours % 12 || 12}.${minutes.toString().padStart(2, '0')}${hours < 12 ? 'am' : 'pm'}`;
  
  return `${formattedDate} | ${formattedTime}`;
}
