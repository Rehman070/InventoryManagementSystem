import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  // 🔹 Success Alert (Toast)
  successSwal(text: string): void {
    const dynamicTitle = `${text} successfully`;
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      title: dynamicTitle,
      icon: 'success'
    });
  }

  // 🔹 Error Alert (Toast)
  errorSwal(text: string): void {
    const dynamicTitle = `${text} failed`;
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      title: dynamicTitle,
      icon: 'error'
    });
  }

  // 🔹 Confirmation Dialog (Returns a Promise)
  async confirmationSwal(title: string, text: string, confirmButtonText: string): Promise<boolean> {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1AC0A1',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText
    });

    return result.isConfirmed;
  }
}
