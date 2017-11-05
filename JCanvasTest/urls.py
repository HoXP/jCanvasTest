from django.conf.urls import include, url
from Main import views as main

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = [
    # Examples:
    # url(r'^$', 'JCanvasTest.views.home', name='home'),
    # url(r'^JCanvasTest/', include('JCanvasTest.JCanvasTest.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^$', main.index, name='index'),
    url(r'^sort/bubble$', main.sort_bubble, name='sort_bubble'),
    url(r'^sort/selection', main.sort_selection, name='sort_selection'),
    url(r'^sort/insertion', main.sort_insertion, name='sort_insertion'),
    url(r'^search/binary', main.search_binary, name='search_binary'),
    url(r'^search/binary_r', main.search_binary_recursion, name='search_binary_recursion'),
]