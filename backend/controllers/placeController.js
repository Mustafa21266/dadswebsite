const Place = require("../models/place");
const Reservation = require("../models/reservation");
const ArticleImages = require("../models/articleImages");
const User = require("../models/user");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const fetch = require("node-fetch");
const reviews_vezeeta = require("../utils/reviews_vezeeta.json");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const streamifier = require("streamifier");

//Create a Place
exports.createPlace = async (req, res, next) => {
  const userObj = await User.findById(req.user._id);
  if (!userObj || userObj.role !== "admin") {
    res.status(401).json({
      success: false,
      message: "Unauthorized Action!",
    });
  } else {
    const {
      name,
      description,
      address,
      user,
      workingDays,
      clinicNumberOne,
      clinicNumberTwo,
      reservationPrice,
    } = req.body;
    const newObj = {
      name,
      description,
      address,
      user,
      workingDays: JSON.parse(workingDays),
      clinicNumberOne,
      clinicNumberTwo,
      reservationPrice,
    };
    let place = await Place.create(newObj);
    // const result = await cloudinary.v2.uploader.upload_large(req.body.placeCover, {
    //     folder: `dadswebsite/places/${place._id}`
    // })

    let myPromise = new Promise(async (resolve, reject) => {
      let response;
      let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
        {
          folder: `dadswebsite/places/${place._id}`,
        },
        function (error, resultObj) {
          // console.log(error, result);
          response = resultObj;
          console.log(response);
          resolve(response);
        }
      );
      await streamifier
        .createReadStream(req.files.placeCover.data)
        .pipe(cld_upload_stream);
    });
    await myPromise.then(async (result) => {
      // console.log('asdasdasasdasdasdasddasd',result)
      place.placeCover = {
        name: req.files.placeCover.name,
        public_id: result.public_id,
        url: result.secure_url,
      };
      return await place.save();
    });

    let myPromise2 = new Promise(async (resolve, reject) => {
      let response;
      let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
        {
          folder: `dadswebsite/places/${place._id}`,
        },
        function (error, resultObj) {
          // console.log(error, result);
          response = resultObj;
          resolve(response);
        }
      );
      await streamifier
        .createReadStream(req.files.placeLogo.data)
        .pipe(cld_upload_stream);
    });
    await myPromise2.then(async (result) => {
      // console.log('asdasdasasdasdasdasddasd',result)
      place.placeLogo = {
        name: req.files.placeLogo.name,
        public_id: result.public_id,
        url: result.secure_url,
      };
      return await place.save();
    });

    let counter = 0;
    const myPromise3 = new Promise(async (resolve, reject) => {
      for (let i = 0; i < Number(req.body.placeImagesLength); i++) {
        let response;
        let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
          {
            folder: `dadswebsite/places/${place._id}/images`,
          },
          function (error, resultObj) {
            // console.log(error, result);
            response = resultObj;
            place.placeImages = place.placeImages.concat([
              {
                public_id: response.public_id,
                url: response.secure_url,
              },
            ]);
            if (i === Number(req.body.placeImagesLength) - 1) {
              resolve(response);
            }

            // console.log("xxxxxxxxxxxxxxxxxx",placeImages)

            // return;
          }
        );
        await streamifier
          .createReadStream(req.files[`placeImages${i}`].data)
          .pipe(cld_upload_stream);
      }
    });

    await myPromise3.then(async (data) => {
      await place.save();
    });

    place = await Place.findById(place._id);
    res.status(200).json({
      success: true,
      message: "Place Created Successfully!",
      place,
    });
    // await myPromise3.then(async data =>{
    //     console.log(placeImages)
    //     place.placeImages = placeImages
    //     return await place.save();
    // }).then(async data => {
    //     place = await Place.findById(place._id)
    //     res.status(200).json({
    //         success: true,
    //         message: 'Place Created Successfully!',
    //         place
    //     })
    // })
  }
};

//Edit a Place
exports.editPlace = async (req, res, next) => {
  const userObj = await User.findById(req.user._id);
  if (!userObj || userObj.role !== "admin") {
    res.status(401).json({
      success: false,
      message: "Unauthorized Action!",
    });
  } else {
    const {
      name,
      description,
      address,
      user,
      workingDays,
      clinicNumberOne,
      clinicNumberTwo,
      reservationPrice,
    } = req.body;
    const newObj = {
      name,
      description,
      address,
      user,
      workingDays: JSON.parse(workingDays),
      clinicNumberOne,
      clinicNumberTwo,
      reservationPrice,
    };
    let place = await Place.findByIdAndUpdate(req.params.id, newObj, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    // const result = await cloudinary.v2.uploader.upload_large(req.body.placeCover, {
    //     folder: `dadswebsite/places/${place._id}`
    // })

    if (req.files) {
      console.log(req.files);
      let myPromise = new Promise(async (resolve, reject) => {
        let response;
        let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
          {
            folder: `dadswebsite/places/${place._id}`,
          },
          function (error, resultObj) {
            // console.log(error, result);
            response = resultObj;
            console.log(response);
            resolve(response);
          }
        );
        await streamifier
          .createReadStream(req.files.placeCover.data)
          .pipe(cld_upload_stream);
      });
      if (req.files.placeCover) {
        // && req.files.placeCover && req.files.placeCover.data
        await cloudinary.v2.uploader.destroy(place.placeCover.public_id);
        await myPromise.then(async (result) => {
          // console.log('asdasdasasdasdasdasddasd',result)
          place.placeCover = {
            name: req.files.placeCover.name,
            public_id: result.public_id,
            url: result.secure_url,
          };
          return await place.save();
        });
      }

      let myPromise2 = new Promise(async (resolve, reject) => {
        let response;
        let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
          {
            folder: `dadswebsite/places/${place._id}`,
          },
          function (error, resultObj) {
            // console.log(error, result);
            response = resultObj;
            resolve(response);
          }
        );
        await streamifier
          .createReadStream(req.files.placeLogo.data)
          .pipe(cld_upload_stream);
      });
      if (req.files.placeLogo) {
        // && req.files.placeLogo && req.files.placeLogo.data
        await cloudinary.v2.uploader.destroy(place.placeLogo.public_id);
        await myPromise2.then(async (result) => {
          // console.log('asdasdasasdasdasdasddasd',result)
          place.placeLogo = {
            name: req.files.placeLogo.name,
            public_id: result.public_id,
            url: result.secure_url,
          };
          return await place.save();
        });
      }

      let counter = 0;
      const myPromise3 = new Promise(async (resolve, reject) => {
        for (let i = 0; i < Number(req.body.placeImagesLength); i++) {
          let response;
          let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
            {
              folder: `dadswebsite/places/${place._id}/images`,
            },
            function (error, resultObj) {
              // console.log(error, result);
              response = resultObj;
              place.placeImages = place.placeImages.concat([
                {
                  public_id: response.public_id,
                  url: response.secure_url,
                },
              ]);
              if (i === Number(req.body.placeImagesLength) - 1) {
                resolve(response);
              }

              // console.log("xxxxxxxxxxxxxxxxxx",placeImages)

              // return;
            }
          );
          await streamifier
            .createReadStream(req.files[`placeImages${i}`].data)
            .pipe(cld_upload_stream);
        }
      });
      if (req.files[`placeImages0`]) {
        console.log(req.files);
        // && req.files[`placeImages0`] &&  req.files[`placeImages0`].data
        await cloudinary.api.delete_resources_by_prefix(
          `dadswebsite/places/${place._id}/images`,
          function (result) {}
        );
        place.placeImages = [];
        await place.save();
        await myPromise3.then(async (data) => {
          await place.save();
        });
      }
    }

    place = await Place.findById(place._id);
    res.status(200).json({
      success: true,
      message: "Place Editied Successfully!",
      place,
    });
    // await myPromise3.then(async data =>{
    //     console.log(placeImages)
    //     place.placeImages = placeImages
    //     return await place.save();
    // }).then(async data => {
    //     place = await Place.findById(place._id)
    //     res.status(200).json({
    //         success: true,
    //         message: 'Place Created Successfully!',
    //         place
    //     })
    // })
  }
};

//Delete a Place
exports.deletePlace = async (req, res, next) => {
  const userObj = await User.findById(req.user._id);
  if (!userObj || userObj.role !== "admin") {
    res.status(401).json({
      success: false,
      message: "Unauthorized Action!",
    });
  } else {
    let place = await Place.findById(req.params.id);
    const myPromise = new Promise(async (resolve, reject) => {
      await cloudinary.v2.uploader.destroy(place.placeCover.public_id);
      await cloudinary.v2.uploader.destroy(place.placeLogo.public_id);
      await cloudinary.api.delete_resources_by_prefix(
        `dadswebsite/places/${place._id}/images`,
        function (result) {}
      );
      await cloudinary.api.delete_folder(`dadswebsite/places/${place._id}`);
      await place.remove();
      let reservations = await Reservation.find({
        "reservationDetails.place": place._id,
      });
      if (reservations) {
        for (let i = 0; i < reservations.length; i++) {
          await reservations[i].remove();
        }
      }
      resolve("resolved");
    });
    await myPromise.finally((data) => {
      res.status(200).json({
        success: true,
        message: "Place Deleted Successfully!",
        place,
      });
    });
  }
};

//Get Places
exports.getAllPlaces = async (req, res, next) => {
  let places = await Place.find();
  console.log(places);
  if (places[0]) {
    res.status(200).json({
      success: true,
      places,
    });
  } else {
    res.status(200).json({
      success: true,
      places: [],
    });
  }
};
