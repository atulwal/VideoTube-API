import { ApiRes } from "../utils/ApiRes.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

/**
 * Health check controller to verify API and Database status.
 */
const healthcheck = asyncHandler(async (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

    const healthInfo = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        database: dbStatus,
        memoryUsage: process.memoryUsage()
    };

    return res
        .status(200)
        .json(new ApiRes(200, healthInfo, "Service is healthy and running smoothly"));
});

export { healthcheck };
