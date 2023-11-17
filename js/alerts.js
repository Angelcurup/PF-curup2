const showAlert = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your score saved",
    showConfirmButton: false,
    timer: 1500,
  });
};
