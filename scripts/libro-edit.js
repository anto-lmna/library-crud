console.log(location.search);
var params = new URLSearchParams(window.location.search);
var id = params.get('id');
console.log(id);

const { createApp } = Vue;
createApp({
	data() {
		return {
			id: 0,
			titulo: '',
			autor: '',
			anio: 0,
			genero: '',
			editorial: '',
			estado: '',

			url: 'https://antolamanna13.pythonanywhere.com/biblioteca/' + id,
		};
	},
	methods: {
		fetchData(url) {
			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					this.id = data.id;
					this.titulo = data.titulo;
					this.autor = data.autor;
					this.anio = data.anio;
					this.genero = data.genero;
					this.editorial = data.editorial;
					this.estado = data.estado;
				})
				.catch((err) => {
					console.error(err);
					this.error = true;
				});
		},
		modificar() {
			let libro = {
				titulo: this.titulo,
				autor: this.autor,
				anio: this.anio,
				genero: this.genero,
				editorial: this.editorial,
				estado: this.estado,
			};

			var options = {
				body: JSON.stringify(libro),
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				redirect: 'follow',
			};
			fetch(this.url, options)
				.then(function () {
					alert('Registro actualizado!');
					window.location.href = 'biblioteca.html';
				})
				.catch((err) => {
					console.error(err);
					alert('Error al actualizar.');
				});
		},
	},
	created() {
		this.fetchData(this.url);
	},
}).mount('#app');
