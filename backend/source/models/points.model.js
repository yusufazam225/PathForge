import mongoose from 'mongoose';


// Define schema for a single point
const PointSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  });
  
  // Define schema for a line segment
  const LineSegmentSchema = new mongoose.Schema({
    startPoint: { type: PointSchema, required: true },
    endPoint: { type: PointSchema, required: true }
  });
  
  // Define schema for the drawing
  const DrawingSchema = new mongoose.Schema({
    coordinatesArray: [PointSchema], // Array of points
    grid: [LineSegmentSchema], // Array of line segments
    userinfo:{type:String,required:true},
    imageData:{type:String,required:true}
  });
  
  // Define model for the drawing
  const DrawingModel = mongoose.model('Drawing', DrawingSchema);
  
export default DrawingModel;