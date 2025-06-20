import { HttpInterceptorFn } from '@angular/common/http';
import { UserInterface } from '../Interface/user.interface';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userData = localStorage.getItem('user');
  let token = '';

  if (userData && userData.trim() !== '') {
    try {
      const user: UserInterface = JSON.parse(userData);
      token = `Token ${user.token}`;
    } catch (e) {
      console.warn('Échec de la récupération du token utilisateur.');
    }
  }

  const modifiedRequest = req.clone({
    setHeaders: {
      Authorization: token
    }
  });

  return next(modifiedRequest);
};
