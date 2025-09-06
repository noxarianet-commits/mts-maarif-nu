document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('block');
        });
    }
    
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('block');
        });
    });

    const path = window.location.pathname;
    const page = path.split("/").pop();
    
    if (page === "index.html" || page === "") {
        loadFeaturedEkskul();
        loadFeaturedBlogs();
    } else if (page === "ekskul.html") {
        loadAllEkskul();
    } else if (page === "blog.html") {
        loadAllBlogs();
    } else if (page === "ekskul-detail.html") {
        loadEkskulDetail();
    } else if (page === "blog-detail.html") {
        loadBlogDetail();
    }
    
    const faqButtons = document.querySelectorAll('.border-gray-200 button');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('i');

            content.classList.toggle('hidden');

            if (content.classList.contains('hidden')) {
                icon.classList.remove('transform', 'rotate-180');
            } else {
                icon.classList.add('transform', 'rotate-180');
            }
        });
    });
});

function loadFeaturedEkskul() {
    const ekskulContainer = document.getElementById('featured-ekskul');
    if (!ekskulContainer) return;
    
    const featuredEkskul = ekskulData.slice(0, 3);
    
    featuredEkskul.forEach(ekskul => {
        const ekskulItem = document.createElement('div');
        ekskulItem.className = 'bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 animate__animated animate__fadeInUp';
        ekskulItem.innerHTML = `
            <img src="${ekskul.image}" alt="${ekskul.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <span class="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold mb-2">${ekskul.category}</span>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${ekskul.title}</h3>
                <p class="text-gray-600 mb-4">${ekskul.description.substring(0, 100)}...</p>
                <a href="ekskul-detail.html?id=${ekskul.id}" class="text-green-600 font-medium hover:text-green-800 transition duration-300">Selengkapnya →</a>
            </div>
        `;
        ekskulContainer.appendChild(ekskulItem);
    });
}

function loadAllEkskul() {
    const ekskulContainer = document.getElementById('ekskul-container');
    if (!ekskulContainer) return;
    
    ekskulData.forEach(ekskul => {
        const ekskulItem = document.createElement('div');
        ekskulItem.className = 'bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 animate__animated animate__fadeInUp';
        ekskulItem.innerHTML = `
            <img src="${ekskul.image}" alt="${ekskul.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex justify-between items-start">
                    <span class="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold mb-2">${ekskul.category}</span>
                    <span class="text-xs text-gray-500"><i class="fas fa-users mr-1"></i> ${ekskul.kuota}</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${ekskul.title}</h3>
                <p class="text-gray-600 mb-4">${ekskul.description.substring(0, 100)}...</p>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-500"><i class="far fa-clock mr-1"></i> ${ekskul.jadwal}</span>
                    <a href="ekskul-detail.html?id=${ekskul.id}" class="text-green-600 font-medium hover:text-green-800 transition duration-300">Detail</a>
                </div>
            </div>
        `;
        ekskulContainer.appendChild(ekskulItem);
    });
}

function loadEkskulDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const ekskulId = parseInt(urlParams.get('id'));
    
    if (!ekskulId) {
        window.location.href = 'ekskul.html';
        return;
    }
    
    const ekskul = ekskulData.find(item => item.id === ekskulId);
    
    if (!ekskul) {
        window.location.href = 'ekskul.html';
        return;
    }
    
    document.title = `MTs Ma'arif NU Sragi | ${ekskul.title}`;
    
    document.getElementById('ekskul-title').textContent = ekskul.title;
    document.getElementById('ekskul-pembina').textContent = `Pembina: ${ekskul.pembina}`;
    document.getElementById('ekskul-jadwal').textContent = ekskul.jadwal;
    
    const ekskulImage = document.getElementById('ekskul-image');
    if (ekskulImage) {
        ekskulImage.src = ekskul.image;
        ekskulImage.alt = ekskul.title;
    }

    const ekskulDescription = document.getElementById('ekskul-description');
    if (ekskulDescription) {
        ekskulDescription.innerHTML = `<p>${ekskul.description}</p>`;
    }

    const ekskulPrestasi = document.getElementById('ekskul-prestasi');
    if (ekskulPrestasi) {
        ekskul.prestasi.forEach(prestasi => {
            const li = document.createElement('li');
            li.className = 'flex items-start';
            li.innerHTML = `<i class="fas fa-check text-green-500 mt-1 mr-2"></i> ${prestasi}`;
            ekskulPrestasi.appendChild(li);
        });
    }
    
    const ekskulGallery = document.getElementById('ekskul-gallery');
    if (ekskulGallery) {
        ekskul.gallery.forEach(image => {
            const div = document.createElement('div');
            div.className = 'overflow-hidden rounded-lg';
            div.innerHTML = `<img src="${image}" alt="${ekskul.title}" class="w-full h-32 object-cover hover:scale-110 transition duration-500 cursor-pointer">`;
            ekskulGallery.appendChild(div);
        });
    }
    
    document.getElementById('ekskul-pembina-side').textContent = ekskul.pembina;
    document.getElementById('ekskul-jadwal-side').textContent = ekskul.jadwal;
    document.getElementById('ekskul-tempat').textContent = ekskul.tempat;
    document.getElementById('ekskul-kuota').textContent = ekskul.kuota;
    document.getElementById('ekskul-kategori').textContent = ekskul.category;
    
    const relatedEkskul = ekskulData.filter(item => item.id !== ekskul.id).slice(0, 3);
    const relatedEkskulContainer = document.getElementById('related-ekskul');
    
    if (relatedEkskulContainer) {
        relatedEkskul.forEach(item => {
            const div = document.createElement('div');
            div.className = 'bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="w-full h-32 object-cover">
                <div class="p-4">
                    <h4 class="font-semibold text-gray-800 mb-1">${item.title}</h4>
                    <p class="text-sm text-gray-600 mb-2">${item.category}</p>
                    <a href="ekskul-detail.html?id=${item.id}" class="text-green-600 text-sm hover:text-green-800 transition duration-300">Lihat Detail →</a>
                </div>
            `;
            relatedEkskulContainer.appendChild(div);
        });
    }
}

function loadFeaturedBlogs() {
    const blogContainer = document.getElementById('featured-blogs');
    if (!blogContainer) return;
    
    const featuredBlogs = blogData.slice(0, 3);
    
    featuredBlogs.forEach(blog => {
        const blogItem = document.createElement('div');
        blogItem.className = 'bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 animate__animated animate__fadeInUp';
        blogItem.innerHTML = `
            <img src="${blog.image}" alt="${blog.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex items-center text-sm text-gray-500 mb-3">
                    <span class="flex items-center mr-4"><i class="far fa-user mr-1"></i> ${blog.author}</span>
                    <span class="flex items-center"><i class="far fa-calendar-alt mr-1"></i> ${blog.date}</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${blog.title}</h3>
                <p class="text-gray-600 mb-4">${blog.excerpt}</p>
                <div class="flex justify-between items-center">
                    <div class="flex space-x-2">
                        ${blog.tags.map(tag => `<span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">${tag}</span>`).join('')}
                    </div>
                    <a href="blog-detail.html?id=${blog.id}" class="text-green-600 font-medium hover:text-green-800 transition duration-300">Baca →</a>
                </div>
            </div>
        `;
        blogContainer.appendChild(blogItem);
    });
}

function loadAllBlogs() {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;
    
    blogData.forEach(blog => {
        const blogItem = document.createElement('div');
        blogItem.className = 'bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 animate__animated animate__fadeInUp';
        blogItem.innerHTML = `
            <img src="${blog.image}" alt="${blog.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex items-center text-sm text-gray-500 mb-3">
                    <span class="flex items-center mr-4"><i class="far fa-user mr-1"></i> ${blog.author}</span>
                    <span class="flex items-center"><i class="far fa-calendar-alt mr-1"></i> ${blog.date}</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${blog.title}</h3>
                <p class="text-gray-600 mb-4">${blog.excerpt}</p>
                <div class="flex justify-between items-center">
                    <div class="flex space-x-2">
                        ${blog.tags.map(tag => `<span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">${tag}</span>`).join('')}
                    </div>
                    <a href="blog-detail.html?id=${blog.id}" class="text-green-600 font-medium hover:text-green-800 transition duration-300">Baca →</a>
                </div>
            </div>
        `;
        blogContainer.appendChild(blogItem);
    });
}

function loadBlogDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = parseInt(urlParams.get('id'));
    
    if (!blogId) {
        window.location.href = 'blog.html';
        return;
    }
    
    const blog = blogData.find(item => item.id === blogId);
    
    if (!blog) {
        window.location.href = 'blog.html';
        return;
    }

    document.title = `MTs Ma'arif NU Sragi | ${blog.title}`;
    
    document.getElementById('blog-title').textContent = blog.title;
    document.getElementById('blog-author').textContent = blog.author;
    document.getElementById('blog-date').textContent = blog.date;
    
    const blogImage = document.getElementById('blog-image');
    if (blogImage) {
        blogImage.src = blog.image;
        blogImage.alt = blog.title;
    }
    
    const blogContent = document.getElementById('blog-content');
    if (blogContent) {
        blogContent.innerHTML = blog.content;
    }

    const blogTags = document.getElementById('blog-tags');
    if (blogTags) {
        blog.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm mr-2';
            span.textContent = tag;
            blogTags.appendChild(span);
        });
    }

    const relatedBlogs = blogData.filter(item => item.id !== blog.id).slice(0, 3);
    const relatedBlogsContainer = document.getElementById('related-blogs');
    
    if (relatedBlogsContainer) {
        relatedBlogs.forEach(item => {
            const div = document.createElement('div');
            div.className = 'bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="w-full h-32 object-cover">
                <div class="p-4">
                    <h4 class="font-semibold text-gray-800 mb-1">${item.title}</h4>
                    <p class="text-sm text-gray-500 mb-2">${item.date}</p>
                    <a href="blog-detail.html?id=${item.id}" class="text-green-600 text-sm hover:text-green-800 transition duration-300">Baca Selengkapnya →</a>
                </div>
            `;
            relatedBlogsContainer.appendChild(div);
        });
    }
}