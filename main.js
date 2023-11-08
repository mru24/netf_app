var o = {
    init() {
        console.log('NETFLIX APP READY');
        this.content = document.getElementById('content');
        this.options = options;

        this.result = '';

        this.moviesURL = 'https://unogs-unogs-v1.p.rapidapi.com/search/titles?order_by=date&type=movie';
        this.genreURL = 'https://unogs-unogs-v1.p.rapidapi.com/static/genres';
        
        
        this.callApi(this.genreURL);

    },
    async callApi(link) {
        switch (link) {
            case this.moviesURL:
                await this.readApi(link);
                this.displayMovies(this.result.results);                
                break;
            case this.genreURL:
                await this.readApi(link);
                this.displayGenres(this.result.results);                
                break;                
        
            default:
                break;
        }
    },
    async readApi(link) {
        const url = link;
        const options = this.options;

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            this.result = result;
            console.log(this.result.results);
        } catch (error) {
            console.error(error);
        }
    },
    async displayMovies(data) {
        this.content.innerHTML = '';
        let html = '';
        data.forEach(movie => {
            html += `
                    <div class="box">
                        <div class="content">
                            <img class="" src="${ movie.img }" />`;
            html += `
                            <div class="footer"> 
                                <p class="title">${ movie.title }</p>
                                <p class="title_date">${ movie.title_date }</p>
                            </div>
                        </div>
                    </div>`;
            if(movie.rating <= 4.5) { html += `<style>#content div.box { border-bottom-color:var(--red); }</style>`; } else
            if(movie.rating > 4.5 && movie.rating < 6.5) { html += `<style>#content div.box { border-bottom-color:var(--yellow); }</style>`; } else
            if(movie.rating >= 6.5) { html += `<style>#content div.box { border-bottom-color:var(--green); }</style>`; }
        });
        this.content.innerHTML = html;
    },
    async displayGenres(data) {
        this.content.innerHTML = '';
        this.content.classList.add('genres');
        let html = '';
        data.forEach(genre => {
            // genreGroup.forEach(genre => {
                html += `
                <span class="genre">${ genre.genre } - ${ genre.netflix_id }</span>`;
            // })
        });
        this.content.innerHTML = html;
    }
}
o.init();