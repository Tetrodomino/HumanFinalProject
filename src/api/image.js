import { Cloudinary } from "@cloudinary/url-gen/index";

/** cloudinary에 이미지를 업로드하기 위한 함수
 * @param {*} image 업로드할 이미지 url
 * @returns 
 */
export async function UploadImage(image) {
    if (!image)
    {
        return null;
    }

    const data = new FormData();
    data.append("file", image);
    data.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    )
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");

    try {
        const response = await fetch(
            `${process.env.REACT_APP_CLOUDINARY_URL}`,
            {
                method: "POST",
                body: data,
            }
        );
        const res = await response.json();
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/** url을 통해 이미지를 불러오는 함수
 * @param {*} url 이미지 주소 string 
 * @returns 
 */
export function FindImage(url) {
    const cld = new Cloudinary({
        cloud: {
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
        }
    })

    const myimage = cld.image(url);

    return myimage
}