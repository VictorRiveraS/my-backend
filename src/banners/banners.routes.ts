import { Router } from 'express';
import ctrl from './banners.ctrl';
import RouteValidator from '../helpers/validators';
import { addBannerImageValidator, bannerssValidator } from './banners.validator';
import { uploadImageS3 } from '../aws-s3-bucket/upload-s3.service';

export const BannersRoutes = Router();

BannersRoutes
    .get('/', RouteValidator.validate, ctrl.fetchBanners)
    .get('/id', bannerssValidator, RouteValidator.validate, ctrl.getBannerById)
    .post('/', RouteValidator.validate, ctrl.createBanner)
    .post('/picture-banner', ctrl.setInfoUpload, uploadImageS3.single('file'), addBannerImageValidator, RouteValidator.validate, ctrl.addBannerImage)
    .patch('/', bannerssValidator, RouteValidator.validate, ctrl.updateBanner)
    .delete('/', bannerssValidator, RouteValidator.validate, ctrl.deleteBanner);