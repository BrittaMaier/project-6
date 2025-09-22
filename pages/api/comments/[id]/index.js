import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    if (request.method === "GET") {
      const foundComments = await Comment.find({ placeId: id });
      if (!foundComments) {
        response.status(400).json({ status: "Not found" });
        return;
      }
      response.status(200).json(foundComments);
      return;
    }
    if (request.method === "DELETE") {
      await Comment.findByIdAndDelete(id);
      response.status(200).json({ message: "Comment deleted successfully" });
      return;
    }
    if (request.method === "POST") {
      const { name, comment } = request.body;
      if (!name || !comment) {
        return response
          .status(400)
          .json({ message: "Missing name or comment" });
      }
      const newComment = await Comment.create({ name, comment, placeId: id });
      response.status(200).json(newComment);
      return;
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
  response.status(405).json({ status: "Method not allowed" });
}
