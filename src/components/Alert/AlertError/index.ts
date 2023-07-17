import Swal from "sweetalert2";

export function ErrorAlert(title: string, message: string) {
  return Swal.fire({
    icon: "error",
    title: `${title}`,
    text: `${message}`,
  });
}
