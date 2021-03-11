export default interface ICreateVehicleDTO {
  name: string;

  description: string;

  photo: string;

  diary_value: number;

  weekly_value: number;

  monthly_value: number;

  waiting_time: number;

  category_id: string;

  brand_id: string;

  model_id: string;

  location_id: string;

  user_id: string;
}
