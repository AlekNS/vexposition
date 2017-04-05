/**
 * @class
 * @memberOf angular.services
 * @description Api Service for access backend features.
 */
export default class ApiService {

  constructor (Upload, appConfigs, $http) {
    'ngInject';

    this.upload = Upload;
    this.$http = $http;
    this.appConfigs = appConfigs;
  }

  /**
   * Book stand by company
   * @param {number} standId
   * @param {object} dataModel Company model
   */
  bookingStand (standId, dataModel) {
    return this.$http.post(this.appConfigs.apiUrl + `booking/${standId}`, dataModel);
  }

  _upload (file, isImage) {
    return this.upload.upload({
      url: `api/upload/${isImage ? 'image' : 'file'}`,
      data: {
        file: file
      }
    });
  }

  /**
   * Upload image to the server
   * @param {Object} file
   * @returns {*} File name
   */
  uploadImage (file) {
    return this._upload(file, true);
  }

  /**
   * Upload file to the server
   * @param {Object} file
   * @returns {*} File name
   */
  uploadFile (file) {
    return this._upload(file, false);
  }
}