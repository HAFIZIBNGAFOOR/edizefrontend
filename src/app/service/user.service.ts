import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private Api: string = 'https://backend.edize.net/api';
  private Api:string = 'http://localhost:3000/api'

  private singleSchoolSubject = new BehaviorSubject<any>(null);
  singleSchool$ = this.singleSchoolSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(formData: FormData) {
    return this.http.post(`${this.Api}/login`, formData);
  }
  signup(formData: FormData) {
    return this.http.post(`${this.Api}/signup`, formData);
  }
  getManagers() {
    return this.http.get(`${this.Api}/manager`);
  }
  addSchool(schoolData: FormData) {
    console.log(schoolData, ' school date inside service');
    return this.http.post(`${this.Api}/school`, schoolData);
  }
  addAppointment(appointmentData: FormData) {
    return this.http.post(`${this.Api}/school/appointment`, appointmentData);
  }
  addKDM(KDMData: FormData) {
    return this.http.post(`${this.Api}/school/kdm`, KDMData);
  }
  addProductPresentation(ProductPresentationData: FormData) {
    return this.http.post(
      `${this.Api}/school/product-presentation`,
      ProductPresentationData
    );
  }
  addProductDemo(ProductPresentationData: FormData) {
    return this.http.post(
      `${this.Api}/school/product-demo`,
      ProductPresentationData
    );
  }
  addHotLead(hotLeadData: FormData) {
    return this.http.post(`${this.Api}/school/hot-lead`, hotLeadData);
  }
  addProposalSigned(proposalSignedData: FormData) {
    return this.http.post(
      `${this.Api}/school/proposal-signed`,
      proposalSignedData
    );
  }
  getClasses(params: { schoolId: string }) {
    return this.http.get(`${this.Api}/school/classes`, { params });
  }
  addParentOrientation(parentOrientationData: FormData) {
    return this.http.post(
      `${this.Api}/school/parent-orientation`,
      parentOrientationData
    );
  }
  addContractSigned(contractData: FormData) { 
    return this.http.post(`${this.Api}/school/contract-signed`, contractData);
  }
  addLost(lostData: FormData) {
    return this.http.post(`${this.Api}/school/lost`, lostData);
  }
  getSchools(params: {
    page?: number;
    pageSize?: number;
    searchTerm?: string;
  }) {
    return this.http.get(`${this.Api}/school`, { params });
  }
  getSingleSchool(params: { id: string }) {
    return this.http.get(`${this.Api}/school/single-school`, { params });
  }
  getProfile() {
    return this.http.get(`${this.Api}/profile`);
  }
  getDashboard() {
    return this.http.get(`${this.Api}/dashboard`);
  }
  getPreSignedUrl(params: { fileName: string; fileType: string }) {
    return this.http.get(`${this.Api}/aws/presigned-url`, { params });
  }
  putProfile(profileData: FormData) {
    return this.http.put(`${this.Api}/profile`, profileData);
  }
  getAllSchools() {
    return this.http.get(`${this.Api}/school/allSchools`);
  }
  uploadFileToS3(url: string, file: File): Observable<any> {
    console.log(file, 'inside urr service');
    return this.http.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
      reportProgress: true,
      observe: 'events',
    });
  }
  updateSingleSchool(school: any) {
    this.singleSchoolSubject.next(school);
  }
  setToken(token: string) {
    localStorage.setItem('edize_user', token);
  }
  getToken() {
    return localStorage.getItem('edize_user');
  }
  removeToken() {
    localStorage.removeItem('edize_user');
  }
  getPayload(): any {
    const token = this.getToken();
    if (token) {
      let userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else return null;
  }
  isLoggedIn(): boolean {
    let payload = this.getPayload();
    if (payload) return payload.exp > Date.now() / 1000;
    else return false;
  }
}
