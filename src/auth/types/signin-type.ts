export interface SignInRequest {
    email: string;
    password: string;
  }
  
  
  export interface SignInResponse {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      profile_image_url:string;
    };
    token: string;
  }
  
  