import toast from "react-hot-toast";
import { arrayBufferToBase64 } from "../../../util/converters";

export function readFile(
  file: File,
  setImage: (name: string, data: string) => void,
) {
  const type = file.type;

  if (type !== "image/jpeg" && type !== "image/png") {
    toast.error(
      "Podany plik jest w niepoprawnym formacie (dozwolone są pliki o formacie .jpg i .png)",
    );
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    if (e.target?.result) {
      setImage(file.name, arrayBufferToBase64(e.target.result as ArrayBuffer));
      toast.success("Plik został wczytany pomyślnie!");
    }
  };

  reader.readAsArrayBuffer(file);
}

export function parseImage(bytes: ArrayBuffer): string {
  const blob = new Blob([bytes]);
  const imageURL = URL.createObjectURL(blob);
  return imageURL;
}
