import { Router } from 'express';
import ctrl from './banners.ctrl';
import RouteValidator from '../helpers/validators';
import { bannerssValidator } from './banners.validator';

export const BannersRoutes = Router();

BannersRoutes
    .get('/', RouteValidator.validate, ctrl.fetchBanners)
    .get('/id', bannerssValidator, RouteValidator.validate, ctrl.getBannerById)
    .post('/', RouteValidator.validate, ctrl.createBanner)
    .patch('/', bannerssValidator, RouteValidator.validate, ctrl.updateBanner)
    .delete('/', bannerssValidator, RouteValidator.validate, ctrl.deleteBanner);