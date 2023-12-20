import numpy as np
from matplotlib import pyplot as plt

from orders.models import Order


def get_stat():
    dct = {}
    for item in Order.objects.prefetch_related("services").all():
        for service in item.services.all():
            if service.name in dct:
                dct[service.name] += 1
            else:
                dct[service.name] = 1

    return dct


def build_plot():
    stats = get_stat()
    np.random.seed(19680801)

    plt.rcdefaults()
    fig, ax = plt.subplots()

    services = stats.keys()
    y_pos = np.arange(len(services))
    performance = stats.values()
    np.random.rand(len(services))

    ax.barh(y_pos, performance, align="center")
    ax.set_yticks(y_pos, labels=services)
    ax.invert_yaxis()
    ax.set_xlabel("Count of usage")
    ax.set_title("Service per count statistic")
    filename = "media/plots/most_popular_service.png"
    plt.savefig(filename, format="png")

    return filename
