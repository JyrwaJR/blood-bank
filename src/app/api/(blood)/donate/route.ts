import { NextRequest, NextResponse } from "next/server";
import { APIRes } from "../../_lib/api-res";

// Mock data
const mockData= [
	{
		id: "7c1ac14a-12f9-50ff-8003-8d499c1afb81",
		user_id: "user1",
		blood_group: "A+",
		donation_date: "2024-01-01",
		created_at: "2024-01-01T12:00:00Z",
	},
	{
		id: "36db3e29-2a4a-5b20-99b3-40cbfae316a4",
		user_id: "user2",
		blood_group: "O-",
		donation_date: "2024-01-15",
		created_at: "2024-01-15T12:00:00Z",
	},
	{
		id: "885f4bfb-a528-5db9-9e92-e2c8643c0407",
		user_id: "user3",
		blood_group: "B+",
		donation_date: "2024-02-01",
		created_at: "2024-02-01T12:00:00Z",
	},
	{
		id: "40727aeb-0599-58ee-bf03-e3eed3745930",
		user_id: "user4",
		blood_group: "AB-",
		donation_date: "2024-03-05",
		created_at: "2024-03-05T12:00:00Z",
	},
	{
		id: "68c56dae-46bd-5b0f-958a-79831cf63440",
		user_id: "user5",
		blood_group: "A-",
		donation_date: "2024-03-10",
		created_at: "2024-03-10T12:00:00Z",
	},
	{
		id: "2d9597fa-7221-55d5-8003-745479ad62e1",
		user_id: "user6",
		blood_group: "O+",
		donation_date: "2024-03-20",
		created_at: "2024-03-20T12:00:00Z",
	},
	{
		id: "9f8d3e52-cfe3-5504-9a75-4b492b6f20ab",
		user_id: "user7",
		blood_group: "B-",
		donation_date: "2024-04-05",
		created_at: "2024-04-05T12:00:00Z",
	},
	{
		id: "2e6b6d59-6898-53da-9fcf-6fd50517880e",
		user_id: "user8",
		blood_group: "AB+",
		donation_date: "2024-04-15",
		created_at: "2024-04-15T12:00:00Z",
	},
	{
		id: "94fb0b7a-c806-5541-8e84-e861e16141d2",
		user_id: "user9",
		blood_group: "A+",
		donation_date: "2024-05-01",
		created_at: "2024-05-01T12:00:00Z",
	},
	{
		id: "1c28c5ed6-9216-58fd-aca7-aaaffe23089a",
		user_id: "user10",
		blood_group: "O-",
		donation_date: "2024-05-15",
		created_at: "2024-05-15T12:00:00Z",
	},
	// Add more records as needed
];

export default mockData;


// GET method to retrieve data
export async function GET(req: NextRequest, res: NextResponse) {
	try {
		// You can perform any necessary operations here, such as fetching data from a database or API
		// For this example, we'll simply return the mock data
		return APIRes({
			status: 200,
			data: mockData,
      message: "Data fetched successfully",
		});
	} catch (error: any) {
		return APIRes({
			status: 500,
			message: error.message,
			error: error,
		});
	}
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
  } catch (error: any) {
    return APIRes({
      status: 500,
      message: error.message,
      error: error,
    });
  }
}
