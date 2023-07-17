import Swal from "sweetalert2";

export function SuccessAlert(title: string, message: string) {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: `${title}`,
    text: `${message}`,
    // showConfirmButton: false,
    // timer: 1500,
  });
}
