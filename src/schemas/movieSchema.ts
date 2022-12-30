import joi from "joi";

export const movieSchema = joi.object({
	title: joi.string().required(),
	posterPath: joi.string(),
	backdropPath: joi.string()
});
